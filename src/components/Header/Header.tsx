import React, { useState, FunctionComponent } from 'react'
import { AppBar, Toolbar, IconButton, Menu } from '@material-ui/core'
import { Person as AccountIcon } from '@material-ui/icons'
import { Typography } from '../Wrappers/Wrappers'
import Button from '@material-ui/core/Button'
import { useUserContext } from '../../context/UserContext'

import useStyles from './styles'

const Header: FunctionComponent = () => {
  const classes = useStyles()
  const { user } = useUserContext()
  const [profileMenu, setProfileMenu] = useState(null)

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <a href="/">
          <img src={require('../../images/checkmarx_logo.png')} alt="Checkmarx Logo image" />
        </a>
        <div className={classes.grow} />
        {user && (
          <>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              className={classes.headerMenuButton}
              aria-controls="profile-menu"
              onClick={(e: any) => setProfileMenu(e.currentTarget)}
            >
              <AccountIcon classes={{ root: classes.headerIcon }} />
            </IconButton>

            <Menu
              id="profile-menu"
              open={Boolean(profileMenu)}
              anchorEl={profileMenu}
              onClose={() => setProfileMenu(null)}
              className={classes.headerMenu}
              classes={{ paper: classes.profileMenu }}
              disableAutoFocusItem
            >
              <div className={classes.profileMenuUser}>
                <Typography variant="h4" weight="medium">
                  {user.userinfo.name}
                </Typography>
                <Typography className={classes.profileMenuLink} component="span" color="inherit">
                  <span id="user-email">{user.userinfo.preferred_username}</span>
                </Typography>
              </div>
              <div className={classes.profileMenuUser}>
                <form method="POST" action="/logout">
                  <Typography className={classes.profileMenuLink} color="primary">
                    <Button type="submit" size="small" id="logout-button">
                      Logout
                    </Button>
                  </Typography>
                </form>
              </div>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
