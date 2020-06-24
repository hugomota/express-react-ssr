import React, { FunctionComponent, MouseEventHandler } from 'react'
import { IconButton } from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'

import useStyles from './styles'

interface IDialogTitleProps {
  onClose?: MouseEventHandler
}

const DialogTitle: FunctionComponent<IDialogTitleProps> = ({ onClose, children, ...other }) => {
  const classes = useStyles()

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {children}
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
}

export default DialogTitle
