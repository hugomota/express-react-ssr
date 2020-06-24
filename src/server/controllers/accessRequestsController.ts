import { Request, Response } from 'express'
import crypto from 'crypto'
import smtp from '../services/smtp'
import { STATUS, ERROR_MESSAGES } from '../../constants/accessRequests'
import { dbService, cxService } from '../services'
import { log as logger, config } from '../utils'
import { IAccessRequest } from '../../types'

const IV_LENGTH = 16
const ENCRYPTION_KEY = config!.app.pwdEncKey
const algorithm = 'aes-256-cbc'
const log = logger('crypto')

export const encrypt = (text: string) => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv)
    let encrypted = cipher.update(text)

    encrypted = Buffer.concat([encrypted, cipher.final()])

    return iv.toString('hex') + ':' + encrypted.toString('hex')
  } catch ({ error }) {
    log.fatal(error)
    throw new Error(error)
  }
}

export const decrypt = (text: string) => {
  try {
    const textParts = text.split(':')
    const iv = Buffer.from(textParts.shift()!, 'hex')
    const encryptedText = Buffer.from(textParts.join(':'), 'hex')
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv)
    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
  } catch ({ error }) {
    log.fatal(error)
    throw new Error(error)
  }
}

class AccessRequestsController {
  public static getAccessRequests = async (req: Request, res: Response) => {
    try {
      const result = await dbService.get(req.url)

      return res.send(result.data)
    } catch ({ response }) {
      return res.status(response.status).json(response.statusText)
    }
  }

  public static isPendingRequest = async (accessRequest: IAccessRequest): Promise<boolean> => {
    const result = await dbService.get(`/access-requests?email=${accessRequest.email}`)
    const entries: IAccessRequest[] = result.data.accessRequests

    return entries.length > 0 && entries[0].status === STATUS['pending']
  }

  public static userExists = (email: string, users: any[]): boolean => {
    const selectedUser = users.find((user: any) => user.email === email)

    return selectedUser ? true : false
  }

  public static usernameTaken = (userName: string, users: any[]): boolean => {
    const selectedUser = users.find((user: any) => user.userName === userName)

    return selectedUser ? true : false
  }

  public static createAccessRequest = async (req: Request, res: Response) => {
    try {
      if (await AccessRequestsController.isPendingRequest(req.body)) {
        return res.status(422).json({ message: ERROR_MESSAGES.requestExists })
      } else {
        const usersResult = await cxService.get('users')

        if (AccessRequestsController.userExists(req.body.email, usersResult.data)) {
          return res.status(422).send({ message: ERROR_MESSAGES.accountExists })
        } else if (AccessRequestsController.usernameTaken(req.body.userName, usersResult.data)) {
          return res.status(422).send({ message: ERROR_MESSAGES.takenUsername })
        }
      }

      const resp = await dbService.post(req.url.replace('/api', ''), {
        ...req.body,
        password: encrypt(req.body.password),
      })

      smtp.sendNewRequestEmail(resp.data)

      return res.status(201).send(resp.data)
    } catch ({ response }) {
      return response ? res.status(response.status).json(response.statusText) : res.status(500)
    }
  }

  public static updateAccessRequest = async (req: Request, res: Response) => {
    const accessRequest = req.body
    const { id } = req.params

    try {
      const { password } = await getAccessRequestDetails(id)
      if (accessRequest.status === STATUS['approved']) {
        await createCxUser({ ...accessRequest, password: decrypt(password) })
      }

      await updateAccessRequestStatus(accessRequest)

      smtp.sendStatusChangeEmail(accessRequest)

      return res.status(201).send(accessRequest)
    } catch (error) {
      const { status, data, statusText } = error.response
      const message = data.message || data.Message || data || statusText

      return res.status(status).json(message)
    }
  }
}

const getAccessRequestDetails = async (id: string) => {
  try {
    const accessRequestResp = await dbService.get(`/access-request-with-details/${id}`)

    return accessRequestResp.data
  } catch (error) {
    throw new Error(error)
  }
}

const updateAccessRequestStatus = async ({ status, id, reason, approver }: IAccessRequest) => {
  try {
    const accessRequestResp = await dbService.put(`/access-requests/${id}`, { status, reason, approver })

    return accessRequestResp.data
  } catch (error) {
    throw new Error(error)
  }
}

const createCxUser = async (userData: IAccessRequest) => {
  try {
    return await (await cxService.post('users', userData)).data
  } catch (error) {
    throw error
  }
}

export default AccessRequestsController
