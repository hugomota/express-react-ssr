import React, { FunctionComponent } from 'react'
import { Button, Dialog, DialogContent, DialogActions, Typography } from '@material-ui/core'
import DialogTitle from '../../components/DialogTitle'
import { useAccessRequestsContext } from '../../context/AccessRequestsContext'
import AccessRequestDetails from '../AccessRequestDetails'
import useStyles from './styles'

const AccessRequestApproveModal: FunctionComponent = () => {
  const classes = useStyles()
  const {
    selectedAccessRequest,
    setSelectedAccessRequest,
    isDetailsModalOpen,
    toggleIsDetailsModalOpen,
  } = useAccessRequestsContext()

  const handleClose = () => {
    toggleIsDetailsModalOpen()
  }

  return selectedAccessRequest ? (
    <Dialog
      open={isDetailsModalOpen}
      onClose={handleClose}
      onExited={() => setSelectedAccessRequest(undefined)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h6">Access Request Details - {selectedAccessRequest.id}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <AccessRequestDetails
          selectedAccessRequest={selectedAccessRequest}
          hiddenFields={[
            'id',
            'tableData',
            'status',
            'createdAt',
            'updatedAt',
            'password',
            'other',
            'reason',
            'approver',
          ]}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={classes.cancelButton}>
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  ) : null
}

export default AccessRequestApproveModal
