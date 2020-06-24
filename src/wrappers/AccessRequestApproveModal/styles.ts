import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(3),
    minHeight: '385px',
    position: 'relative',
  },
  stepper: {
    paddingBottom: 0,
  },
}))
