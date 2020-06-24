import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme: any) => ({
  dialogTitle: {
    paddingBottom: theme.spacing(1),
  },
  title: {
    textTransform: 'capitalize',
  },
  iconContainer: {
    paddingRight: '15px',
  },
  statusIcon: {
    fontSize: '45px',
  },
  secondaryMessage: {
    padding: '10px 0',
  },
}))
