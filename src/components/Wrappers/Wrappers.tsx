import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles, Badge as BadgeBase, Typography as TypographyBase, Button as ButtonBase } from '@material-ui/core'
import { useTheme, makeStyles } from '@material-ui/styles'
import classnames from 'classnames'

const useStyles = makeStyles(() => ({
  badge: {
    fontWeight: 600,
    height: 16,
    minWidth: 16,
  },
}))

interface IBadgeProps {
  children: ReactNode
  colorBrightness?: string
  color?: string
  badgeContent?: number | null
}

const Badge: FunctionComponent<IBadgeProps> = ({ children, colorBrightness, color, badgeContent, ...props }) => {
  const classes = useStyles()
  const theme = useTheme()
  const Styled = createStyled({
    badge: {
      backgroundColor: getColor(color, theme, colorBrightness),
    },
  })

  return (
    <Styled>
      {(styledProps: any) => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge),
          }}
          {...props}
        >
          {children}
        </BadgeBase>
      )}
    </Styled>
  )
}

interface ITypographyProps {
  children: React.ReactNode
  weight?: string
  size?: string
  colorBrightness?: string
  color?: string
  className?: string
  variant?: string
  component?: ReactNode
  onClick?: Function
}

const Typography: FunctionComponent<ITypographyProps> = ({
  children,
  weight,
  size,
  colorBrightness,
  color,
  variant,
}) => {
  const theme: any = useTheme()

  return (
    <TypographyBase
      style={{
        color: getColor(color, theme, colorBrightness),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(variant, theme, size),
      }}
    >
      {children}
    </TypographyBase>
  )
}

type Size = 'medium' | 'large' | 'small' | undefined
type Color = 'success' | 'warning' | 'secondary' | undefined
type Variant = 'text' | 'outlined' | 'contained' | undefined

interface IButtonProps {
  color?: Color
  size?: Size
  className?: string
  variant?: Variant
  children: ReactNode
}

const Button: FunctionComponent<IButtonProps> = ({ children, color, ...props }) => {
  const theme: any = useTheme()

  const Styled = createStyled({
    button: {
      backgroundColor: getColor(color, theme),
      boxShadow: theme.customShadows.widget,
      color: 'white',
      '&:hover': {
        backgroundColor: getColor(color, theme, 'light'),
        boxShadow: theme.customShadows.widgetWide,
      },
    },
  })

  return (
    <Styled>
      {({ classes }: any) => (
        <ButtonBase classes={{ root: classes.button }} {...props}>
          {children}
        </ButtonBase>
      )}
    </Styled>
  )
}

export { Badge, Typography, Button }

const getColor = (color?: string, theme?: any, brigtness: string = 'main') => {
  if (color && theme.palette[color] && theme.palette[color][brigtness]) {
    return theme.palette[color][brigtness]
  }
}

const getFontWeight = (style?: string) => {
  switch (style) {
    case 'light':
      return 300
    case 'medium':
      return 500
    case 'bold':
      return 600
    default:
      return 400
  }
}

const getFontSize = (variant: string = '', theme: any, size?: string) => {
  let multiplier

  switch (size) {
    case 'sm':
      multiplier = 0.8
      break
    case 'md':
      multiplier = 1.5
      break
    case 'xl':
      multiplier = 2
      break
    case 'xxl':
      multiplier = 3
      break
    default:
      multiplier = 1
      break
  }

  const defaultSize =
    variant && theme.typography[variant] ? theme.typography[variant].fontSize : theme.typography.fontSize + 'px'

  return `calc(${defaultSize} * ${multiplier})`
}

const createStyled = (styles: any, options?: any) => {
  const Styled = function(props: any) {
    const { children, ...other } = props
    return children(other)
  }

  return withStyles(styles, options)(Styled)
}
