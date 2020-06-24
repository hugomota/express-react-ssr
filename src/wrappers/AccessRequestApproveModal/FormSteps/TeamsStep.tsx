import React, { FunctionComponent, useState, useEffect, SyntheticEvent, createRef } from 'react'
import { convertToTreeData } from '../../../utils'
import { IUseForm } from '../../../utils/useForm'
import TreeView, { INode } from '../../../components/TreeView'
import SearchInput from '../../../components/SearchInput'
import { Box } from '@material-ui/core'
import { useAccessRequestsContext } from '../../../context/AccessRequestsContext'

const TeamsStep: FunctionComponent<IUseForm> = ({ values, handleChange }) => {
  const { availableTeams } = useAccessRequestsContext()
  const teams: INode[] = convertToTreeData(availableTeams)
  const searchInputRef = createRef<any>()

  const [expanded, setExpanded] = useState<Array<string>>(['1'])
  const [filterText, setFilterText] = useState<string>('')
  const [filteredNodes, setFilteredNodes] = useState<INode[]>(teams)

  const handleSearchInputChange = (e: SyntheticEvent) => setFilterText((e.target as HTMLTextAreaElement).value)
  const handleItemCheck = (checkedTeams: string[]) => handleChange({ name: 'teamIds', value: checkedTeams })

  const filterTree = () => {
    return !filterText ? setFilteredNodes(teams) : setFilteredNodes(teams.reduce(filterNodes, []))
  }

  const filterNodes = (filteredAcc: INode[], node: INode): INode[] => {
    const children = (node.children || []).reduce(filterNodes, [])
    const label = node.label.toString().toLowerCase()

    if (label.indexOf(filterText.toLocaleLowerCase()) > -1 || children.length) {
      filteredAcc.push({ ...node, children })
    }

    return filteredAcc
  }

  const handleClearClick = () => {
    setFilterText('')
    searchInputRef.current.focus()
  }

  useEffect(() => {
    filterTree()
  }, [filterText])

  return (
    <>
      <Box mb="20px">
        <SearchInput
          placeholder="Search"
          value={filterText}
          onChange={(e: SyntheticEvent) => handleSearchInputChange(e)}
          onClearClick={handleClearClick}
          inputRef={searchInputRef}
        />
      </Box>
      <TreeView
        checked={values.teamIds}
        expanded={expanded}
        nodes={filteredNodes}
        onCheck={(checkedTeamsIds: string[]) => handleItemCheck(checkedTeamsIds)}
        onExpand={(expandedTeamsIds: string[]) => setExpanded(expandedTeamsIds)}
        noCascade
      />
    </>
  )
}

export default TeamsStep
