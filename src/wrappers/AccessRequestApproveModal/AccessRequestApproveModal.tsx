import React, { FunctionComponent } from 'react'
import { DateTime } from 'luxon'
import { useToasts } from 'react-toast-notifications'
import { Dialog, DialogContent, DialogActions, Typography, Button } from '@material-ui/core'
import DatePicker from '../../components/DatePicker'
import DialogTitle from '../../components/DialogTitle'
import Notification from '../../components/Notification'
import Progress from '../../components/Progress'
import AccessRequestDetails from '../AccessRequestDetails'
import { useForm } from '../../utils'
import { apiService } from '../../server/services'
import { IAccessRequest } from '../../types'
import { useAccessRequestsContext } from '../../context/AccessRequestsContext'
import { useLayoutContext } from '../../context/LayoutContext'
import { useUserContext } from '../../context/UserContext'
import { getGeneratedName, getTeam, getParentTeam, createTeam, getUserRoles } from './helpers'
import { APPROVAL_MODAL_VALIDATION_SCHEMA, STATUS } from '../../constants'
import useStyles from './styles'

interface IAccessRequestApproveModalProps {
  onApprove?: Function
}

let requestData: IAccessRequest

const AccessRequestApproveModal: FunctionComponent<IAccessRequestApproveModalProps> = ({ onApprove }) => {
  const {
    openLoading,
    closeLoading,
    appConfig: { defaultUserRoles, defaultAccountDurationInWeeks },
  } = useLayoutContext()
  const {
    isApprovalModalOpen,
    isDuplicatedTeamWarningModalOpen,
    selectedAccessRequest,
    setIsDuplicatedTeamWarningModalOpen,
    toggleIsApprovalModalOpen,
  } = useAccessRequestsContext()

  const { user } = useUserContext()
  const { addToast } = useToasts()
  const classes = useStyles()
  let teamAlreadyExists: boolean = false

  const getTeamIds = async ({ email, country, region }: IAccessRequest, createRandomNameTeam: boolean = false) => {
    const teams = await (await apiService.get('teams')).data
    const regionFullPath = `\\CxServer\\SP\\${region}`
    const generatedName = getGeneratedName(country, email, createRandomNameTeam)
    const newTeamFullPath = `${regionFullPath}\\${generatedName}`
    const existingTeam = getTeam(teams, newTeamFullPath)

    if (existingTeam) {
      teamAlreadyExists = true
      return [existingTeam.id]
    } else {
      const parentTeam = getParentTeam(teams, regionFullPath)
      if (parentTeam) {
        const newCreatedTeam = await createTeam(generatedName, parentTeam!.id, newTeamFullPath)
        return [newCreatedTeam.id]
      } else {
        throw new Error(
          `The region ${regionFullPath} doesn't exist! Please make sure that the AccessControl teams tree is correct.`
        )
      }
    }
  }

  const updateAccessRequest = async (createRandomNameTeam: boolean = false) => {
    isDuplicatedTeamWarningModalOpen && openLoading('notificationModal')

    try {
      if (createRandomNameTeam) {
        requestData.teamIds = await getTeamIds(requestData, true)
      }

      await apiService.put(`/access-requests/${requestData!.id}`, requestData)
      onApprove && onApprove()

      addToast(`The request was successfully approved!`, {
        appearance: 'success',
        autoDismiss: true,
      })
    } catch (err) {
      if (err.response) {
        const data = err.response.data
        const message = data.message || data.Message || data
        addToast(message || err.response.statusText, { appearance: 'error' })
      } else {
        addToast(err.message || 'An error occurred, please try again later.', { appearance: 'error' })
      }
    }
    isDuplicatedTeamWarningModalOpen && setIsDuplicatedTeamWarningModalOpen(false)
    toggleIsApprovalModalOpen()
    closeLoading('approvalModal')
  }

  const submitApproval = async (formValues: IAccessRequest) => {
    openLoading('approvalModal')

    try {
      requestData = {
        ...selectedAccessRequest,
        ...formValues,
        status: STATUS['approved'],
        localeId: 1,
        authenticationProviderId: 1,
        active: true,
        approver: user && user.userinfo.preferred_username,
        teamIds: await getTeamIds(selectedAccessRequest!),
        roleIds: await getUserRoles(defaultUserRoles),
      }

      if (teamAlreadyExists) {
        setIsDuplicatedTeamWarningModalOpen(true)
      } else {
        updateAccessRequest()
      }
    } catch (err) {
      if (err.response) {
        addToast(err.response.data.Message, { appearance: 'error' })
      } else {
        addToast(err.message, { appearance: 'error' })
        toggleIsApprovalModalOpen()
        closeLoading('approvalModal')
      }
    }
  }

  const formProps = useForm(
    { expirationDate: DateTime.local().plus({ weeks: defaultAccountDurationInWeeks }) },
    APPROVAL_MODAL_VALIDATION_SCHEMA,
    submitApproval
  )

  const hiddenDetails = ['id', 'tableData', 'reason', 'status', 'createdAt', 'updatedAt', 'password']

  return selectedAccessRequest ? (
    <>
      <Dialog
        scroll="paper"
        open={isApprovalModalOpen}
        onClose={toggleIsApprovalModalOpen}
        onExited={formProps.resetForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle onClose={toggleIsApprovalModalOpen}>
          <Typography variant="h6">Approve Access Request - {selectedAccessRequest.id}</Typography>
        </DialogTitle>

        <DialogContent dividers className={classes.dialogContent}>
          <AccessRequestDetails selectedAccessRequest={selectedAccessRequest} hiddenFields={hiddenDetails} />
          <DatePicker
            label="Expiration Date"
            value={formProps.values.expirationDate}
            onChange={(date: any) => formProps.handleChange({ name: 'expirationDate', value: date })}
            name="expirationDate"
            disablePast
          />
          <Progress scope="approvalModal" />
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            id="approve-request-button"
            onClick={e => formProps.handleSubmit(e)}
            disabled={formProps.disable}
          >
            Approve request
          </Button>
        </DialogActions>
      </Dialog>
      {isDuplicatedTeamWarningModalOpen && (
        <Notification
          open
          autoDismiss={false}
          id="request-existing-team-notification"
          message="This team already exists!"
          secondaryMessage="Are you sure you want to add to the existing team or generate a new one?"
          type="warning"
          withCloseButton
          onDismiss={() => setIsDuplicatedTeamWarningModalOpen(false)}
          actionsSection={
            <>
              <Button onClick={() => updateAccessRequest(true)}>Generate a new team</Button>
              <Button color="primary" onClick={() => updateAccessRequest()}>
                Add to the same team
              </Button>
              <Progress scope="notificationModal" />
            </>
          }
        />
      )}
    </>
  ) : null
}

export default AccessRequestApproveModal
