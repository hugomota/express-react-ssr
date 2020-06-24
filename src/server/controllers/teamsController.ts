import { Request, Response } from 'express'
import { cxService } from '../services'

class TeamsController {
  public static getTeams = async (req: Request, res: Response) => {
    try {
      const result = await cxService.get(req.url)
      return res.send(result.data)
    } catch ({ response }) {
      return res.status(response.status).json(response.statusText)
    }
  }

  public static createTeam = async (req: Request, res: Response) => {
    try {
      const resp = await cxService.post(req.url.replace('/api', ''), req.body)

      return res.status(201).send(resp.data)
    } catch ({ response }) {
      return res.status(response.status).json({ ...response.data })
    }
  }
}

export default TeamsController
