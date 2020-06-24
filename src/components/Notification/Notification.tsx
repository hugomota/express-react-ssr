import React, { FunctionComponent } from 'react'
import { useLayoutContext } from '../../context/LayoutContext'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  DialogTitle,
  IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { CheckCircle, Cancel, Warning } from '@material-ui/icons'
import { INotification } from '../../types'
import useStyles from './styles'

const renderIcon = (type: string = 'info', classes: any) => {
  let icon = (
    <Box color="success.main">
      <CheckCircle className={classes.statusIcon} />
    </Box>
  )

  if (type == 'warning') {
    icon = (
      <Box color="warning.main">
        <Warning className={classes.statusIcon} />
      </Box>
    )
  } else if (type == 'error') {
    icon = (
      <Box color="error.main">
        <Cancel className={classes.statusIcon} />
      </Box>
    )
  }

  return icon
}

const Notification: FunctionComponent<INotification> = ({
  open,
  uid,
  type,
  message,
  title,
  secondaryMessage,
  autoDismiss = true,
  timeout = 5000,
  onDismiss,
  dismissButtonText = 'Ok',
  id,
  actionsSection,
  withCloseButton,
}) => {
  const classes = useStyles()
  const { removeNotification, notifications } = useLayoutContext()

  const handleDismissButtonClick = () => {
    removeNotification(uid!)
    onDismiss && onDismiss()
  }

  const isOpen = notifications.some((notification: INotification) => notification.uid === uid) || open || false

  autoDismiss && setTimeout(() => removeNotification(uid!), timeout)

  return (
    <Dialog open={isOpen} id={id}>
      <DialogTitle className={classes.dialogTitle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span className={classes.title}>{title ? title : `${type}!`}</span>
          {withCloseButton && (
            <IconButton aria-label="Close" size="medium" onClick={() => handleDismissButtonClick()}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" flexDirection="row">
          {type !== 'info' && <div className={classes.iconContainer}>{renderIcon(type, classes)}</div>}
          <Typography>{message}</Typography>
        </Box>
        {secondaryMessage && (
          <Box>
            <Typography variant="body2" className={classes.secondaryMessage}>
              {secondaryMessage}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {actionsSection ? (
          actionsSection
        ) : (
          <Button color="primary" onClick={() => handleDismissButtonClick()}>
            {dismissButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default Notification
