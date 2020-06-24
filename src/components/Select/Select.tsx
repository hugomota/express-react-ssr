import React, { FunctionComponent } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { default as MuiSelect } from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

interface ISelectOption {
  label: string
  value: any
}

interface ISelectProps {
  handleChange: Function
  options: ISelectOption[]
  name: string
  label: string
  multiple?: boolean
  values: { [key: string]: object }
  required?: boolean
  errors?: { [key: string]: object }
}

const Select: FunctionComponent<ISelectProps> = ({
  handleChange,
  options,
  name,
  label,
  multiple,
  values,
  errors,
  required,
}) => {
  const error = errors && errors[name] ? errors[name] : null

  return (
    <FormControl fullWidth required={required}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <MuiSelect
        inputProps={{ name, id: name }}
        onChange={e => handleChange(e)}
        value={values[name]}
        required={required}
        multiple={multiple}
        fullWidth
      >
        {options.map((option: ISelectOption) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default Select
