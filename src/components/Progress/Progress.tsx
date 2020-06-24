import React, { FunctionComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useLayoutContext } from '../../context/LayoutContext'
import useStyles from './styles'

interface IProgressProps {
  active?: boolean,
  scope?: string
}

const Progress: FunctionComponent<IProgressProps> = ({ active = false, scope }) => {
  const { activeProgressInstances } = useLayoutContext()
  const classes = useStyles()
  const show = scope ? activeProgressInstances.includes(scope) : active

  return (
    <>
      {show && (
        <div className={classes.backdrop}>
          <CircularProgress />
        </div>
      )}
    </>
  )
}

export default Progress
