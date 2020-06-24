import React, { FunctionComponent } from 'react'
import omit from 'lodash/omit'
import { DateTime } from 'luxon'
import { Typography } from '@material-ui/core'
import Grid, { GridProps } from '@material-ui/core/Grid'
import { LABELS_BY_FIELD_NAME, STATUS } from '../../constants/accessRequests'
import { IAccessRequest } from '../../types'
import useStyles from './styles'

interface IField {
  label: string
  children: any
  gridSize?: GridProps['xs']
  classes?: string
}

interface IAccessRequestDetailsProps {
  hiddenFields: string[]
  selectedAccessRequest: IAccessRequest
}

const AccessRequestDetails: FunctionComponent<IAccessRequestDetailsProps> = ({
  hiddenFields,
  selectedAccessRequest,
}) => {
  const classes = useStyles()

  const isPendingRequest = selectedAccessRequest && selectedAccessRequest.status !== STATUS['pending']

  return selectedAccessRequest ? (
    <Grid container className={classes.detailsContiner}>
      {Object.keys(omit(selectedAccessRequest, hiddenFields)).map(
        (field: string) =>
          selectedAccessRequest[field] &&
          field !== 'other' && (
            <Field key={field} label={LABELS_BY_FIELD_NAME[field]} classes={classes.detailsListItem}>
              {selectedAccessRequest[field]}
            </Field>
          )
      )}

      {selectedAccessRequest.other && (
        <Field gridSize={12} label={LABELS_BY_FIELD_NAME['other']}>
          {selectedAccessRequest.other}
        </Field>
      )}
      {selectedAccessRequest.reason && (
        <Grid container className={classes.datesContainer}>
          <Field label={LABELS_BY_FIELD_NAME['reason']} gridSize={12}>
            {selectedAccessRequest.reason}
          </Field>
        </Grid>
      )}
      <Grid container className={classes.datesContainer}>
        <Field label={LABELS_BY_FIELD_NAME['createdAt']}>
          {DateTime.fromISO(selectedAccessRequest.createdAt).toLocaleString(DateTime.DATETIME_MED)}
        </Field>
        {isPendingRequest && selectedAccessRequest.updatedAt && (
          <Field label={LABELS_BY_FIELD_NAME[selectedAccessRequest.status]}>
            {DateTime.fromISO(selectedAccessRequest.updatedAt).toLocaleString(DateTime.DATETIME_MED)}
          </Field>
        )}
      </Grid>
    </Grid>
  ) : null
}

export default AccessRequestDetails

const Field: FunctionComponent<IField> = ({ label, gridSize = 6, classes, children }) => {
  return (
    <Grid item xs={gridSize} key="createdAt" className={classes}>
      <Typography variant="subtitle2" display="inline">
        {label}:
      </Typography>
      <Typography variant="body2" display="inline">
        {' '}
        {children}
      </Typography>
    </Grid>
  )
}
