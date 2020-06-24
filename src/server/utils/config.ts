import { log as logger } from './logger'
import { join } from 'path'

const log = logger('web app config')
interface IApp {
  appSecret: string
  certificatesPath: string
  defaultUserRoles: string[]
  defaultAccountDurationInWeeks: number
  host: string
  port: string
  pwdEncKey: string
  rootRegionsTeamsPath: string
  recaptchaSiteKey: string
}

interface IOkta {
  apiKey: string
  clientId: string
  clientSecret: string
  orgUrl: string
  issuer: string
}

interface ICx {
  clientSecret: string
  host: string
  password: string
  username: string
}

interface IDb {
  database: string
  host: string
  password: string
  port: string
  username: string
}

interface ISmtp {
  from?: string
  host: string
  password: string
  port: number
  username: string
}

interface ITest {
  idp: {
    username: string
    password: string
  }
}

export interface IConfig {
  app: IApp
  okta: IOkta
  cx: ICx
  db: IDb
  smtp: ISmtp
  test?: ITest
}

const getConfig = () => {
  try {
    const config: IConfig = require(join(process.cwd(), 'config.json'))
    return config
  } catch (error) {
    log.fatal('Config file not found!')
  }
}

export default getConfig()
