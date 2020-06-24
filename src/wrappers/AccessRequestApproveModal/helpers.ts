import { apiService } from '../../server/services'
import { ICountryOption, ITeam } from '../../types'
import { COUNTRIES } from '../../constants'

export const getUserRoles = async (defaultUserRoles: string[]) => {
  const roles = await (await apiService.get('roles')).data
  return roles.filter((role: any) => defaultUserRoles.includes(role.name)).map((role: any) => role.id)
}

export const createTeam = async (name: string, parentId: number, newTeamFullPath: string) => {
  await apiService.post(`/teams`, { name, parentId })
  const teams = await (await apiService.get('teams')).data

  return teams.find((team: ITeam) => team.fullName.toLowerCase() === newTeamFullPath.toLowerCase())
}

export const getParentTeam = (teams: ITeam[], regionFullPath: string) =>
  teams.find((team: ITeam) => team.fullName.toLowerCase() === regionFullPath.toLowerCase())

export const getTeam = (teams: ITeam[], newTeamFullPath: string) =>
  teams.find((team: ITeam) => team.fullName.toLowerCase() === newTeamFullPath.toLowerCase())

export const getGeneratedName = (country: string, email: string, randomTeamName: boolean): string => {
  const domain = email.split('@')[1]

  const suffix = randomTeamName
    ? Math.floor(Math.random() * 50000)
    : COUNTRIES.find((countryItem: ICountryOption) => countryItem.name === country)!.callingCodes[0]

  return `${domain} - ${suffix}`
}
