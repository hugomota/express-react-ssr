import React, { ReactNode, FunctionComponent } from 'react'
import { default as MuiModal } from '@material-ui/core/Modal'
import ModalHeader from './ModalHeader'
import Paper from '@material-ui/core/Paper'
import useStyles from './styles'

interface IModal {
  children: ReactNode
  disableBackdropClick?: boolean
  onClose: Function
  open: boolean
  title?: string
  withCloseButton: boolean
}

const Modal: FunctionComponent<IModal> = ({
  title,
  withCloseButton,
  onClose,
  children,
  open,
  disableBackdropClick,
}) => {
  
  const classes = useStyles()

  return (
    <MuiModal open={open} disableBackdropClick={disableBackdropClick}>
      <Paper className={classes.root}>
        <ModalHeader title={title} withCloseButton={withCloseButton} onClose={onClose} />
        {children}
      </Paper>
    </MuiModal>
  )
}

export default Modal
