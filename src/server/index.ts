import compression from 'compression'
import express, { Request, Response } from 'express'
import fs from 'fs'
import https from 'https'
import pick from 'lodash/pick'
import session from 'express-session'
import { join as pathJoin } from 'path'

import apiRoutes from './routes/api'
import ssrRoutes from './routes/ssr'
import { accessRequestsController } from './controllers'
import { log as logger, config } from './utils'

const app = express()

app.use(compression())
app.use(express.static('public'))

const { ExpressOIDC } = require('@okta/oidc-middleware')
const MemoryStore = require('memorystore')(session)
const helmet = require('helmet')
const log = logger('server')

// Config
const { appSecret, host, port, certificatesPath } = config!.app
const { clientId, clientSecret, issuer } = config!.okta

// Certificates
const certificates = {
  key: fs.readFileSync(pathJoin(process.cwd(), `${certificatesPath}.key`)),
  cert: fs.readFileSync(pathJoin(process.cwd(), `${certificatesPath}.cert`)),
}

// Session Opts
const sessionOpts = {
  secret: appSecret,
  cookie: { maxAge: 86400000 },
  resave: true,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000,
  }),
}

const oidc = new ExpressOIDC({
  appBaseUrl: `${host}:${port}`,
  client_id: clientId,
  client_secret: clientSecret,
  issuer,
  scope: 'openid profile',
})
app.use(helmet())
app.use(session(sessionOpts))
app.use(oidc.router)
app.use((req: any, _res, next) => {
  req.conf = { app: pick(config!.app, ['defaultUserRoles', 'recaptchaSiteKey', 'defaultAccountDurationInWeeks']) }
  next()
})

oidc.on('ready', () => {
  app.use(express.json(), express.urlencoded({ extended: false }))

  // api - not authenticated
  app.post('/api/access-requests', accessRequestsController.createAccessRequest)

  // api - authenticated
  app.use('/api', oidc.ensureAuthenticated(), apiRoutes)

  // ssr
  // app.get('/', (req: Request, res: Response) => app.render(req, res, '/registrationForm'))
  app.use('/', ssrRoutes)
  // app.get('/admin', (_req: Request, res: Response) => res.redirect('/access-requests'))
  // app.get('/access-requests/:id?', oidc.ensureAuthenticated(), (req: Request, res: Response) =>
  //   app.render(req, res, '/accessRequests')
  // )

  // Todo: Handle 404

  try {
    https.createServer(certificates, app).listen(parseInt(port, 10), () => host)
  } catch (err) {
    log.fatal(err)
  }

  log.info(`Server is listening on ${host}:${port}`)
})

oidc.on('error', (err: any) => {
  log.error(`An error occurred while setting up OIDC, during token revocation, or during post-logout handling - ${err}`)
})
