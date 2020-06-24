import React, { FunctionComponent } from 'react'
import { Button } from '@material-ui/core'
import useStyles from './styles'
import { Typography } from '../Wrappers/Wrappers'

interface IPageTitleProps {
  title: string
  button?: string
  onButtonClick?: Function
}

const PageTitle:FunctionComponent<IPageTitleProps> = props => {
  const classes = useStyles()

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      {props.button && (
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          color="primary"
          onClick={() => props.onButtonClick && props.onButtonClick()}
        >
          {props.button}
        </Button>
      )}
    </div>
  )
}
export default PageTitle
