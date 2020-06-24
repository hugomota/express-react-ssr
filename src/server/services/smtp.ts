import nodemailer from 'nodemailer'
import fs from 'fs'
import handlebars from 'handlebars'
import axios from 'axios'
import { DateTime } from 'luxon'
import { IAccessRequest } from '../../types'
import { log as logger, config } from '../utils'
import { join as pathJoin } from 'path'
import {
  NEW_REQUEST_EMAIL_SUBJECT,
  STATUS_CHANGE_REQUEST_EMAIL_SUBJECT,
  STATUS_CHANGE_EMAIL_TEMPLATE,
  NEW_REQUEST_EMAIL_TEMPLATE,
} from '../../constants/accessRequests'
import { OKTA_TEAMS_MAP } from '../../constants'

const log = logger('email service')

const getGroupEmails = async (selectedUserRegionGroup: string): Promise<string[]> => {
  const { orgUrl, apiKey } = config!.okta

  try {
    const axiosConfig = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `SSWS ${apiKey}`,
      },
    }

    const groupsResp = await axios.get(`${orgUrl}/api/v1/groups`, axiosConfig)
    const selectedGroup = groupsResp.data.find(
      (group: any) => group.profile.name == OKTA_TEAMS_MAP[selectedUserRegionGroup.toLowerCase()]
    )

    if (selectedGroup) {
      const resp = await axios.get(`${orgUrl}/api/v1/groups/${selectedGroup.id}/users`, axiosConfig)
      const selectedGroupActiveUsers = resp.data.filter((user: any) => user.status === 'ACTIVE')

      if (!selectedGroupActiveUsers.length) {
        log.info(
          `notification emails not sent: there is no Okta users from the region/group ${selectedUserRegionGroup}`
        )
      }

      return selectedGroupActiveUsers.map((user: any) => user.profile.email)
    } else {
      log.info(`notification emails not sent: there is no Okta group with the name ${selectedUserRegionGroup}`)
      return []
    }
  } catch (error) {
    throw new Error(`Okta api: ${error.message}`)
  }
}

const getCompiledHtml = (data: IAccessRequest, templateFile: string) => {
  const templateSource = fs.readFileSync(pathJoin(process.cwd(), templateFile), 'utf8').toString()

  const template: any = handlebars.compile(templateSource)
  return template(data)
}

const sendEmail = async (data: any, subject: string, audience: string[] | string, template: string) => {
  const { host, port, username, password, from } = config!.smtp

  log.info('sending email(s) from %s the to the following emails: %s', from, audience)

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      auth: {
        user: username,
        pass: password,
      },
    })

    log.debug('the selected template was: %s', template)

    const info = await transporter.sendMail({
      from,
      to: audience,
      subject,
      html: getCompiledHtml(data, template),
    })

    log.info('message sent: %s', info.messageId)
  } catch (err) {
    log.info('failed to send the email: %s', err)
  }
}

const sendNewRequestEmail = async (data: IAccessRequest) => {
  log.info('sending a new request email notification')

  try {
    const isoDate = DateTime.fromISO(data.createdAt)
    const audience = await getGroupEmails(data.region)

    if (audience.length) {
      const templateData = {
        ...data,
        createdAt: isoDate.toLocaleString({
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        currentYear: isoDate.get('year'),
        url: `${config!.app.host}:${config!.app.port}/admin`,
      }

      sendEmail(templateData, NEW_REQUEST_EMAIL_SUBJECT, audience, NEW_REQUEST_EMAIL_TEMPLATE)
    }
  } catch (error) {
    log.info('failed to send the email: %s', error)
  }
}

const sendStatusChangeEmail = async (data: IAccessRequest) => {
  const isoDate = DateTime.fromISO(data.createdAt)

  log.info('sending and status change email notification')

  try {
    const templateData = {
      ...data,
      createdAt: isoDate.toLocaleString({
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      currentYear: isoDate.get('year'),
      url: `${config!.app.host}:${config!.app.port}`,
    }

    sendEmail(templateData, STATUS_CHANGE_REQUEST_EMAIL_SUBJECT, data.email, STATUS_CHANGE_EMAIL_TEMPLATE)
  } catch (error) {
    log.error('failed to send the email: %s', error)
  }
}

export default {
  sendNewRequestEmail,
  sendStatusChangeEmail,
}
