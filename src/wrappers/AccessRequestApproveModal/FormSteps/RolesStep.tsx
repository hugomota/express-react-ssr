import React, { FunctionComponent, SyntheticEvent } from 'react'
import { List, ListItem, ListItemText, Checkbox, ListItemIcon } from '@material-ui/core'
import { IUseForm } from '../../../utils/useForm'
import { useAccessRequestsContext } from '../../../context/AccessRequestsContext'
import { IRole } from '../../../types'

const RolesStep: FunctionComponent<IUseForm> = ({ handleChange, values }) => {
  const { availableRoles } = useAccessRequestsContext()

  const handleCheck = async (e: SyntheticEvent, role: IRole) => {
    const { checked } = e.target as HTMLInputElement
    const prevRoles: number[] = values.roleIds

    const selectedRoles = checked ? [...prevRoles, role.id] : prevRoles.filter(prevRole => prevRole != role.id)

    handleChange({
      name: 'roleIds',
      value: selectedRoles,
    })
  }

  return (
    <List>
      {availableRoles.map((role: IRole) => (
        <ListItem key={`role-${role.id}`} divider>
          <ListItemIcon>
            <Checkbox onChange={e => handleCheck(e, role)} />
          </ListItemIcon>
          <ListItemText primary={role.name} secondary={role.description} />
        </ListItem>
      ))}
    </List>
  )
}

export default RolesStep
