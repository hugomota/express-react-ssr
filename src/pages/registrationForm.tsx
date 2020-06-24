import React, { FunctionComponent, createRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Grid, Typography, Paper, Link, Button, IconButton, Tooltip } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import TextField from '../components/TextField/TextField'
import Select from '../components/Select/Select'
import { IMainLayoutProps } from '../components/Layouts/MainLayout/MainLayout'
import Layout from '../components/Layouts/NoUserLayout/NoUserLayout'
import { useForm } from '../utils'
import { apiService } from '../server/services'
import { useLayoutContext } from '../context/LayoutContext'
import { USER_FORM_INITIAL_VALUES, USER_FORM_VALIDATION_SCHEMA, COUNTRIES, REGIONS } from '../constants'
import { IAccessRequest, ICountryOption } from '../types'
import useStyles from '../styles/registration'

interface IRegistrationPage extends FunctionComponent {
  Layout: FunctionComponent<IMainLayoutProps>
}

const Registration: IRegistrationPage = () => {
  const { openLoading, closeLoading, addNotification, appConfig } = useLayoutContext()

  const handleFormSubmit = async (data: IAccessRequest, resetForm: Function) => {
    try {
      await apiService.post('/access-requests', data)

      addNotification({
        autoDismiss: false,
        id: 'request-success-notification',
        message: 'The request was successfully submitted!',
        onDismiss: resetForm,
        secondaryMessage: 'You will be notified by email once the request is reviewed.',
        type: 'success',
      })
    } catch ({ response }) {
      addNotification({
        autoDismiss: false,
        id: 'request-error-notification',
        message: (response && response.data.message) || 'Failed to submit your request! Please try again later.',
        type: 'error',
      })
    }

    closeLoading('baseLayout')
  }

  const handleFailedCaptcha = () => {
    addNotification({
      message: 'Failed your captcha validation! Please repeat the form submission.',
      type: 'error',
      autoDismiss: true,
    })

    closeLoading('baseLayout')
  }

  const executeCaptcha = (e: any) => {
    openLoading('baseLayout')
    e.preventDefault()

    // Disable recaptcha for testing purposes
    if (process.env.NODE_ENV === 'production' && recaptchaRef && recaptchaRef.current) {
      recaptchaRef.current.reset()
      recaptchaRef.current.execute()
    } else {
      formProps.handleSubmit()
    }
  }

  const countriesOptions = COUNTRIES.map(({ name }: ICountryOption) => {
    return {
      label: name,
      value: name,
    }
  })

  const recaptchaRef: any = createRef()
  const formProps = useForm(USER_FORM_INITIAL_VALUES, USER_FORM_VALIDATION_SCHEMA, handleFormSubmit)
  const classes = useStyles()
  return (
    <form onSubmit={e => executeCaptcha(e)}>
      <Paper className={classes.paper}>
        <Typography variant="h3" color="textPrimary">
          Registration
        </Typography>

        <Typography variant="body2" color="textSecondary" className={classes.subtitle}>
          Please register below to obtain access to Checkmarx Security Source Code Analysis tool.
        </Typography>

        <Grid container spacing={4} className={classes.formContainer}>
          <Grid item sm={6} xs={12}>
            <TextField name="firstName" label="First Name" {...formProps} required />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField name="lastName" label="Last Name" {...formProps} required />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField name="userName" label="User Name" {...formProps} required />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField name="email" label="Email" {...formProps} required />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField name="jobTitle" label="Job Title" {...formProps} />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField name="phoneNumber" label="Phone" {...formProps} />
          </Grid>

          <Grid item sm={6} xs={12}>
            <div className={classes.passwordField}>
              <TextField name="password" type="password" label="Password" {...formProps} required />
              <Tooltip
                title="Password must be at least 9 characters long and contain at least one special character, a digit, one lowercase (a-z) and at least one uppercase (A-Z)"
                enterDelay={500}
                leaveDelay={200}
                className={classes.passwordInfoTootip}
              >
                <IconButton aria-label="info" size="small" color="secondary">
                  <InfoIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField name="cellPhoneNumber" label="Mobile Phone" {...formProps} />
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField name="other" label="Other" {...formProps} />
          </Grid>

          <Grid item sm={6} xs={12}>
            <Select name="country" label="Country" options={countriesOptions} {...formProps} required />
          </Grid>

          <Grid item sm={6} xs={12}>
            <Select name="region" label="Region" options={REGIONS} {...formProps} required />
          </Grid>

          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={appConfig.recaptchaSiteKey}
            onChange={() => formProps.handleSubmit()}
            onErrored={() => handleFailedCaptcha()}
          />
        </Grid>

        <Grid container justify="flex-end">
          <Button
            id="submit-request-button"
            type="submit"
            variant="contained"
            color="secondary"
            disabled={formProps.disable}
          >
            Submit
          </Button>
        </Grid>
      </Paper>
      <Copyright />
    </form>
  )
}

Registration.Layout = Layout

export default Registration

const Copyright: FunctionComponent = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://www.checkmarx.com/">
      Checkmarx
    </Link>{' '}
    {new Date().getFullYear()}
  </Typography>
)
