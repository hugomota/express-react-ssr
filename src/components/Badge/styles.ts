import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  circle: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginRight: theme.spacing(1),
  },
}))
