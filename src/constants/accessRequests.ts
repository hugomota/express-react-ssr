import { CSSProperties } from 'react'
import Validations from '../utils/validations'
import { Options, Column } from 'material-table'
import { normalizeDateTime } from '../utils/helpers'
import { StringTMap } from '../types'

type ColorStates = 'success' | 'warning' | 'secondary'

//Initial Values
export const DECLINE_MODAL_INITIAL_VALUES = { reason: '' }
export const DECLINE_MODAL_VALIDATION_SCHEMA = [{ reason: { required: true } }]

// Email Subjects
export const NEW_REQUEST_EMAIL_SUBJECT = 'New Cx Private Cloud access request'
export const STATUS_CHANGE_REQUEST_EMAIL_SUBJECT = 'Cx Private Cloud access request status change'

// Email Templates
export const STATUS_CHANGE_EMAIL_TEMPLATE = 'templates/request-status-change.html'
export const NEW_REQUEST_EMAIL_TEMPLATE = 'templates/new-request.html'

// Error Messages
export const ERROR_MESSAGES = {
  accountExists: 'There is already an account with the specified email.',
  takenUsername: 'The specified username is already in use. Please choose another one!',
  requestExists: 'There is already a pending request with this email. Please wait for the request review.',
}

// Form
export const USER_FORM_INITIAL_VALUES = {
  cellPhoneNumber: '',
  region: '',
  country: '',
  email: '',
  firstName: '',
  jobTitle: '',
  lastName: '',
  other: '',
  password: '',
  phoneNumber: '',
  userName: '',
}

export const APPROVAL_MODAL_VALIDATION_SCHEMA = {
  expirationDate: { required: false },
}

export const USER_FORM_VALIDATION_SCHEMA = {
  firstName: {
    required: true,
    validator: {
      regEx: Validations.name,
      error: 'Invalid first name',
    },
  },
  lastName: {
    required: true,
    validator: {
      regEx: Validations.name,
      error: 'Invalid last name',
    },
  },
  password: {
    required: true,
    validator: {
      regEx: Validations.password,
      error: 'Invalid password',
    },
  },
  jobTitle: {
    required: false,
    validator: {
      regEx: Validations.name,
      error: 'Invalid job title',
    },
  },
  email: {
    required: true,
    validator: {
      regEx: Validations.email,
      error: 'Invalid email',
    },
  },
  userName: {
    required: true,
    validator: {
      regEx: Validations.username,
      error: 'Invalid username',
    },
  },
  phoneNumber: {
    required: false,
    validator: {
      regEx: Validations.phone,
      error: 'Invalid phone number',
    },
  },
  cellPhoneNumber: {
    required: false,
    validator: {
      regEx: Validations.phone,
      error: 'Invalid mobile phone number',
    },
  },
  country: { required: true },
  region: { required: true },
  other: { required: false },
}

export const LABELS_BY_FIELD_NAME: StringTMap<string> = {
  approved: 'Approved Date',
  approver: 'Approver',
  cellPhoneNumber: 'Mobile Phone',
  country: 'Country',
  createdAt: 'Creation Date',
  declined: 'Declined Date',
  email: 'Email',
  expirationDate: 'Expiration Date',
  firstName: 'First Name',
  jobTitle: 'Job Title',
  lastName: 'Last Name',
  other: 'Other',
  phoneNumber: 'Phone',
  reason: 'Reason',
  region: 'Region',
  updatedAt: 'Updated Date',
  userName: 'Username',
}

export const STATUS: { [key: string]: string } = {
  approved: 'approved',
  pending: 'pending',
  declined: 'declined',
}

export const COLORS_BY_STATUS: { [key: string]: ColorStates } = {
  approved: 'success',
  pending: 'secondary',
  declined: 'warning',
}

export const TABLE_OPTIONS: Options = {
  debounceInterval: 500,
  draggable: false,
  filtering: true,
  pageSize: 10,
  pageSizeOptions: [10, 30, 50, 100],
  searchFieldAlignment: 'right',
  toolbar: false,
}

const cellGlobalStyle: CSSProperties = {
  paddingRight: '16px',
  whiteSpace: 'nowrap',
}

export const TABLE_COLUMNS: Array<Column<any>> = [
  {
    cellStyle: cellGlobalStyle,
    field: 'firstName',
    filtering: false,
    render: ({ firstName, lastName }: any) => `${firstName} ${lastName}`,
    title: 'Name',
  },
  { title: 'Username', field: 'userName', filtering: false, cellStyle: cellGlobalStyle },
  { title: 'Email', field: 'email', cellStyle: cellGlobalStyle },
  {
    cellStyle: cellGlobalStyle,
    field: 'createdAt',
    filtering: false,
    render: ({ createdAt }: any) => normalizeDateTime(createdAt),
    title: 'Date',
    type: 'datetime',
  },
]
