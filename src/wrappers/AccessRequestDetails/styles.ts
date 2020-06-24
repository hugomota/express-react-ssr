import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  detailsContiner: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
  },
  detailsListItem: {
    marginBottom: theme.spacing(1.5),
  },
  cancelButton: {
    marginLeft: theme.spacing(4),
  },
  datesContainer: {
    marginTop: theme.spacing(2),
  },
}))
