import React, { ReactNode, FunctionComponent, useEffect } from 'react'
import useStyles from './styles'
import Header from '../../Header/Header'
import Progress from '../../Progress/Progress'
import Notification from '../../Notification'
import { useLayoutContext } from '../../../context/LayoutContext'

interface IMainLayoutProps {
  children: ReactNode
  appConfig: any
}

const MainLayout: FunctionComponent<IMainLayoutProps> = ({ children, appConfig }) => {
  const classes = useStyles()
  const { notifications, setAppConfig } = useLayoutContext()

  useEffect(() => {
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
