import React, { FunctionComponent, SyntheticEvent } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { DateTime } from 'luxon'

interface IDatePickerProps {
  format?: string
  id?: string
  label: string
  name: string
  onChange?: Function
  value: DateTime
  disablePast?: boolean
  disableFuture?: boolean
}

const DatePicker: FunctionComponent<IDatePickerProps> = ({
  format = 'MM/dd/yyyy',
  id,
  label,
  name,
  onChange,
  value,
  disablePast,
  disableFuture,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk
        disableFuture={disableFuture}
        disablePast={disablePast}
        disableToolbar
        format={format}
        id={id}
        label={label}
        margin="normal"
        name={name}
        onChange={(date: any) => onChange && onChange(date)}
        value={value}
        variant="inline"
        KeyboardButtonProps={{
          'aria-label': 'change expiration date',
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker
