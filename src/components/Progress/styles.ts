import { makeStyles } from '@material-ui/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles((theme: any) => ({
  backdrop: {
    alignItems: 'center',
    backgroundColor: fade(theme.palette.background.light, 0.4),
    bottom: 0,
    cursor: 'progress',
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1,
  },
}))
