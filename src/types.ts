export interface StringTMap<T> {
  [key: string]: T
}

export interface IAction {
  payload: object
  type: string
}

interface IUserInfo {
  name: string
  preferred_username: string
}

export interface IUser {
  userinfo: IUserInfo
}

export interface IAccessRequest {
  [key: string]: any
  active?: boolean
  authenticationProviderId: number
  region: string
  country: string
  createdAt: string
  email: string
  firstName: string
  id: number
  jobTitle?: string
  lastName: string
  expirationDate?: string
  localeId: number
  cellPhoneNumber?: string
  other?: string
  password: string
  phoneNumber?: string
  status: string
  updatedAt?: string
  userName: string
}

export interface INotification {
  withCloseButton?: boolean
  actionsSection?: any
  autoDismiss?: boolean
  dismissButtonText?: string
  id?: string
  message: string
  onDismiss?: Function
  open?: boolean
  secondaryMessage?: string
  timeout?: number
  title?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  uid?: number
}

export interface ITeam {
  fullName: string
  id: number
  name: string
  parentId?: number
  type: string
}

export interface IRole {
  description: number
  id: number
  isSystemRole: boolean
  name: string
  permissionIds: string[]
}

export interface ICountryOption {
  alpha2Code: string
  alpha3Code: string
  callingCodes: string[]
  name: string
  numericCode?: string
}
