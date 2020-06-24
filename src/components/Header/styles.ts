import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#4c4b57',
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  headerMenu: {
    marginTop: theme.spacing(7),
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  headerIcon: {
    fontSize: 28,
    color: 'rgba(255, 255, 255, 0.35)',
  },
  profileMenu: {
    minWidth: 265,
  },
  profileMenuUser: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))
