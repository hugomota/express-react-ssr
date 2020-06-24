import { useState } from 'react'
import createUseContext from 'constate'
import { IUser } from '../types'

function useUser() {
  const [user, setUser] = useState<IUser>()

  return { user, setUser }
}

export const useUserContext = createUseContext(useUser)
