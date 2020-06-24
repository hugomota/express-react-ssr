import { Request, Response } from 'express'
import { cxService } from '../services'

class RolesController {
  public static getRoles = async (req: Request, res: Response) => {
    try {
      const result = await cxService.get(req.url)
      return res.send(result.data)
    } catch ({ response }) {
      return res.status(response.status).json(response.statusText)
    }
  }
}

export default RolesController
