import express, { Router } from 'express'
import { accessRequestsController } from '../controllers'
import TeamsController from '../controllers/teamsController'
import RolesController from '../controllers/rolesController'

const apiRoutes = Router()

// Middeware
apiRoutes.use(express.json(), express.urlencoded({ extended: false }))

//AccessRequests
apiRoutes.get('/access-requests', accessRequestsController.getAccessRequests)
apiRoutes.put('/access-requests/:id?', accessRequestsController.updateAccessRequest)

//Teams
apiRoutes.get('/teams', TeamsController.getTeams)
apiRoutes.post('/teams', TeamsController.createTeam)

//Roles
apiRoutes.get('/roles', RolesController.getRoles)

export default apiRoutes
