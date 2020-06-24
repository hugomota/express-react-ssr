import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

interface IModalHeader {
  withCloseButton: boolean
  title?: string
  onClose: Function
}

const ModalHeader: React.SFC<IModalHeader> = ({
  withCloseButton,
  title,
  onClose,
}) => (
  <div>
    <div>
      {title && (
        <Typography component="span">
          <Box
            color="black"
            fontWeight="fontWeightMedium"
            fontSize="subtitle1.fontSize"
          >
            {title}
          </Box>
        </Typography>
      )}
    </div>

    {withCloseButton && (
      <IconButton
        aria-label="Close"
        size="small"
        onClick={() => onClose && onClose()}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    )}
  </div>
)

export default ModalHeader
