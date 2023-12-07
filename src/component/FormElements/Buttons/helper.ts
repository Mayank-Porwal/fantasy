import { Theme } from '@mui/material'
import { tokens } from '../../../utils/theme'

export const getButtonsStyle = (type: string | undefined, theme: Theme) => {
  const colors = tokens(theme.palette.mode)
  let styleObject = {
    color: colors.primary[100],
    backgroundColor: colors.greenAccent[500],
    border: `1px solid ${colors.greenAccent[500]}`,
  }
  if (!type) {
    return
  }

  switch (type) {
    case 'outlined':
      styleObject = {
        ...styleObject,
        backgroundColor: 'inherit',
        color: colors.greenAccent[500],
      }
      break
    case 'text':
      styleObject = {
        ...styleObject,
        backgroundColor: 'inherit',
        color: colors.greenAccent[500],
        border: 'none',
      }
      break
    default:
      styleObject = styleObject
  }
  return styleObject
}
