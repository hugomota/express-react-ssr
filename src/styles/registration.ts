import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme: any) => ({
  paper: {
    position: 'relative',
    maxWidth: '700px',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  subtitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  formContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  },
  passwordField: {
    position: 'relative',
  },
  passwordInfoTootip: {
    position: 'absolute',
    right: 0,
    top: '20px',
  },
}))
