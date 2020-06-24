import React, { FunctionComponent } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

type IBottomNavigation = {
  currentStep: number
  hasErrors: boolean
  stepsTotal: number
  autoAssignTeam?: boolean
  onStepChange: Function
}

const BottomNavigation: FunctionComponent<IBottomNavigation> = ({
  currentStep,
  stepsTotal,
  hasErrors,
  autoAssignTeam = false,
  onStepChange,
}) => {
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === stepsTotal - 1 || autoAssignTeam

  return (
    <>
      {!isFirstStep && !autoAssignTeam && (
        <Grid item>
          <Button onClick={() => onStepChange(currentStep - 1)}>Back</Button>
        </Grid>
      )}

      <Button
        color="primary"
        id={autoAssignTeam ? 'approve-request-button' : 'next-step-button'}
        onClick={() => onStepChange(currentStep + 1, isLastStep)}
        disabled={hasErrors && !autoAssignTeam}
      >
        {isLastStep || autoAssignTeam ? 'Approve request' : 'Next'}
      </Button>
    </>
  )
}

export default BottomNavigation
