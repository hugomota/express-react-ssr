import React, { FunctionComponent } from 'react'
import { default as MuiTextField } from '@material-ui/core/TextField'

type TextFieldProps = {
  autoFocus?: boolean
  errors?: { [key: string]: object }
  handleBlur: Function
  handleChange: Function
  label: string
  multiline?: boolean
  name: string
  placeholder?: string
  required?: boolean
  rows?: string
  step?: number
  type?: string
  values: { [key: string]: object }
}

const TextField: FunctionComponent<TextFieldProps> = ({
  required,
  name,
  values,
  errors,
  label,
  multiline,
  handleBlur,
  handleChange,
  rows,
  autoFocus,
  placeholder,
  type = 'text',
}) => {
  const error = errors && errors[name] ? errors[name] : null

  return (
    <MuiTextField
      error={!!error}
      fullWidth
      helperText={error}
      id={name}
      label={label}
      name={name}
      multiline={multiline}
      onBlur={e => handleBlur(e)}
      onChange={e => handleChange(e)}
      required={required}
      type={type}
      value={values[name]}
      rows={rows}
      autoFocus={autoFocus}
      placeholder={placeholder}
    />
  )
}

export default TextField
