import React, { FunctionComponent } from 'react'
import { Button, Dialog, DialogContent, DialogActions, Typography } from '@material-ui/core'
import { useToasts } from 'react-toast-notifications'
import DialogTitle from '../../components/DialogTitle'
import TextField from '../../components/TextField'
import Progress from '../../components/Progress'
import AccessRequestDetails from '../AccessRequestDetails'
import { useAccessRequestsContext } from '../../context/AccessRequestsContext'
import { useLayoutContext } from '../../context/LayoutContext'
import { useUserContext } from '../../context/UserContext'
import { DECLINE_MODAL_INITIAL_VALUES, DECLINE_MODAL_VALIDATION_SCHEMA, STATUS } from '../../constants/accessRequests'
import { useForm } from '../../utils'
import { apiService } from '../../server/services'
import useStyles from './styles'

interface IAccessRequestDeclineModalProps {
  onDecline?: Function
}

const AccessRequestDeclineModal: FunctionComponent<IAccessRequestDeclineModalProps> = ({ onDecline }) => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const formProps = useForm(DECLINE_MODAL_INITIAL_VALUES, DECLINE_MODAL_VALIDATION_SCHEMA)
  const hiddenFields = [
    'id',
    'tableData',
    'reason',
    'userName',
    'status',
    'createdAt',
    'country',
    'region',
    'updatedAt',
    'password',
    'other',
    'phoneNumber',
    'jobTitle',
    'cellPhoneNumber',
  ]

  const {
    selectedAccessRequest,
    setSelectedAccessRequest,
    isDeclineModalOpen,
    toggleIsDeclineModalOpen,
  } = useAccessRequestsContext()

  const { openLoading, closeLoading } = useLayoutContext()
  const { user } = useUserContext()

  const handleExited = () => {
    setSelectedAccessRequest(undefined)
    formProps.resetForm()
  }

  const handleDeclineClick = async () => {
    if (selectedAccessRequest) {
      const data = {
        ...selectedAccessRequest,
        ...formProps.values,
        status: STATUS.declined,
        approver: user && user.userinfo.preferred_username,
      }

      try {
        openLoading('declineModal')
        await apiService.put(`/access-requests/${data.id}`, data)
        onDecline && onDecline()
        toggleIsDeclineModalOpen()
        addToast('The request was successfully declined!', { appearance: 'success', autoDismiss: true })
      } catch (err) {
        addToast(err.message, { appearance: 'error' })
      }
      closeLoading('declineModal')
    }
  }

  return selectedAccessRequest ? (
    <Dialog
      open={isDeclineModalOpen}
      onClose={toggleIsDeclineModalOpen}
      onExited={handleExited}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle onClose={toggleIsDeclineModalOpen}>
        <Typography variant="h6">Decline Access Request - {selectedAccessRequest.id}</Typography>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <AccessRequestDetails selectedAccessRequest={selectedAccessRequest} hiddenFields={hiddenFields} />
        <TextField label="Decline Reason" name="reason" multiline rows="3" {...formProps} required />
        <Progress scope="declineModal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleIsDeclineModalOpen}>Dismiss</Button>
        <Button color="primary" onClick={handleDeclineClick} id="decline-request-button" disabled={formProps.disable}>
          Decline
        </Button>
      </DialogActions>
    </Dialog>
  ) : null
}

export default AccessRequestDeclineModal
