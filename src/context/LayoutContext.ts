import { useState } from 'react'
import createUseContext from 'constate'
import { INotification } from '../types'

function useLayout() {
  const [activeProgressInstances, setActiveProgressInstances] = useState<string[]>([])
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [appConfig, setAppConfig] = useState<any>({
    defaultUserRoles: ['SAST Scanner'],
    recaptchaSiteKey: '',
    defaultAccountDurationInWeeks: 2,
  })

  const openLoading = (scope: string) => setActiveProgressInstances(prevInstances => [...prevInstances, scope])

  const closeLoading = (scope: string) =>
    setActiveProgressInstances(prevInstances => prevInstances.filter(instance => instance !== scope))

  const toggleLoading = (scope: string) =>
    activeProgressInstances.includes(scope) ? closeLoading(scope) : openLoading(scope)

  const addNotification = (newNotification: INotification) => {
    setNotifications((prevNotifications: INotification[]) => {
      newNotification.uid = prevNotifications.length
      return [...prevNotifications, newNotification]
    })
  }

  const removeNotification = (uid: number) => {
    setNotifications((prevNotifications: INotification[]) =>
      prevNotifications.filter(notification => notification.uid !== uid)
    )
  }

  return {
    activeProgressInstances,
    addNotification,
    appConfig,
    closeLoading,
    notifications,
    openLoading,
    removeNotification,
    setActiveProgressInstances,
    setAppConfig,
    toggleLoading,
  }
}

export const useLayoutContext = createUseContext(useLayout)
