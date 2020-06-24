import React, { FunctionComponent } from 'react'
import { Typography, Box } from '@material-ui/core'

import useStyles from './styles'

interface IBadgeProps {
  children?: string
  color?: 'success' | 'secondary' | 'warning'
}

const DataTable: FunctionComponent<IBadgeProps> = ({ color, children }) => {
  const classes = useStyles()
  return (
    <Box display="flex" flex-direction="row" alignItems="center">
      <Box className={classes.circle} bgcolor={`${color}.main`}></Box>
      <Typography color="inherit">
        {children}
      </Typography>
    </Box>
  )
}

export default DataTable
