import React, { ReactNode, FunctionComponent, useEffect } from 'react'
import useStyles from './styles'
import Header from '../../Header/Header'
import Progress from '../../Progress/Progress'
import Notification from '../../Notification'
import { useUserContext } from '../../../context/UserContext'
import { useLayoutContext } from '../../../context/LayoutContext'
import { IUser } from '../../../types'

export interface IMainLayoutProps {
  children: ReactNode
  user: IUser
  appConfig: any
}

const MainLayout: FunctionComponent<IMainLayoutProps> = ({ children, user, appConfig }) => {
  const classes = useStyles()
  const { setUser } = useUserContext()
  const { notifications, setAppConfig } = useLayoutContext()

  useEffect(() => {
    user && setUser(user)
    appConfig && setAppConfig(appConfig)
  }, [])

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <div className={classes.fakeToolbar} />
        {children}
      </div>
      <Progress scope="baseLayout" />
      {notifications.length ? <Notification {...notifications[0]} /> : null}
    </div>
  )
}

export default MainLayout
