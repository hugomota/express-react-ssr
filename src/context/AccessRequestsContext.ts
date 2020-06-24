import { useState } from 'react'
import createUseContext from 'constate'
import { ITeam, IAccessRequest, IRole } from '../types'

function useAccessRequests() {
  const [accessRequests, setAccessRequests] = useState<Array<IAccessRequest>>([])
  const [availableRoles, setavailableRoles] = useState<Array<IRole>>([])
  const [availableTeams, setAvailableTeams] = useState<Array<ITeam>>([])
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState<boolean>(false)
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState<boolean>(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false)
  const [isDuplicatedTeamWarningModalOpen, setIsDuplicatedTeamWarningModalOpen] = useState<boolean>(false)
  const [selectedAccessRequest, setSelectedAccessRequest] = useState<IAccessRequest | undefined>(undefined)

  const addAccessRequest = (newAccessRequest: IAccessRequest) => {
    setAccessRequests((prevAccessRequests: IAccessRequest[]) => [...prevAccessRequests, newAccessRequest])
  }
  const toggleIsApprovalModalOpen = () => setIsApprovalModalOpen((isApprovalModalOpen: boolean) => !isApprovalModalOpen)
  const toggleIsDeclineModalOpen = () => setIsDeclineModalOpen((isDeclineModalOpen: boolean) => !isDeclineModalOpen)
  const toggleIsDetailsModalOpen = () => setIsDetailsModalOpen((isDetailsModalOpen: boolean) => !isDetailsModalOpen)
  const toggleIsDuplicatedTeamWarningModalOpen = () =>
    setIsDuplicatedTeamWarningModalOpen(
      (isDuplicatedTeamWarningModalOpen: boolean) => !isDuplicatedTeamWarningModalOpen
    )

  return {
    accessRequests,
    addAccessRequest,
    availableRoles,
    availableTeams,
    isApprovalModalOpen,
    isDeclineModalOpen,
    isDetailsModalOpen,
    isDuplicatedTeamWarningModalOpen,
    selectedAccessRequest,
    setAccessRequests,
    setAvailableTeams,
    setIsDuplicatedTeamWarningModalOpen,
    setSelectedAccessRequest,
    setavailableRoles,
    toggleIsApprovalModalOpen,
    toggleIsDeclineModalOpen,
    toggleIsDetailsModalOpen,
    toggleIsDuplicatedTeamWarningModalOpen,
  }
}

export const useAccessRequestsContext = createUseContext(useAccessRequests)
