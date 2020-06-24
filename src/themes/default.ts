import tinycolor from 'tinycolor2'

const primary = '#4a90e2'
const secondary = '#089cd4'
const warning = '#e78c07'
const success = '#2b7d2b'
const info = '#427cac'

const lightenRate = 7.5
const darkenRate = 15

export default {
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#fff',
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      primary: '#4a4a4a',
      secondary: '#6e6e6e',
      hint: '#b9b9b9',
    },
    background: {
      default: '#f6f7ff',
      light: '#f3f5ff',
    },
  },
  customShadows: {
    widget: '0px 3px 11px 0px #e8eafC, 0 3px 3px -2px #b2b2b21a, 0 1px 8px 0 #9a9a9a1a',
    widgetDark: '0px 3px 18px 0px #4558a3b3, 0 3px 3px -2px #b2b2b21a, 0 1px 8px 0 #9a9a9a1a',
    widgetWide: '0px 12px 33px 0px #e8eafC, 0 3px 3px -2px #b2b2b21a, 0 1px 8px 0 #9a9a9a1a',
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
    },
    MuiMenu: {
      paper: {
        boxShadow: '0px 3px 11px 0px #e8eafC, 0 3px 3px -2px #b2b2b21a, 0 1px 8px 0 #9a9a9a1a',
      },
    },
    MuiSelect: {
      icon: {
        color: '#b9b9b9',
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: '#f3f5ff !important',
          '&:focus': {
            backgroundColor: '#f3f5ff',
          },
        },
      },
      button: {
        '&:hover, &:focus': {
          backgroundColor: '#f3f5ff',
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: 'white',
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '1px solid rgba(224, 224, 224, .5)',
      },
      head: {
        fontSize: '0.95rem',
      },
      body: {
        fontSize: '0.95rem',
      },
    },
  },
}
