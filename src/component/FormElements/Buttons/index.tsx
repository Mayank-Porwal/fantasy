import { Button, SvgIconProps, useTheme } from '@mui/material'
import { ButtonTypes } from '../../../utils/constants'
import { tokens } from '../../../utils/theme'
import { getButtonsStyle } from './helper'
interface Props {
  id: string
  label?: string | React.ReactElement<SvgIconProps>
  onClick: Function
  disabled?: boolean
  buttonType?: 'text' | 'outlined' | 'contained' | undefined
  className?: string
  width?: string
}
const FantasyButtons = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Button
      className={props.className}
      id={props.id}
      onClick={(e: any) => props.onClick(e)}
      disabled={props.disabled ? props.disabled : false}
      variant={props.buttonType ? props.buttonType : ButtonTypes.CONTAINED}
      sx={{
        ...getButtonsStyle(props.buttonType, theme),
        width: props.width ? props.width : '100%',
        fontWeight: 'bold',
      }}
    >
      <span style={{ color: props.buttonType === ButtonTypes.CONTAINED ? colors.grey[600] : colors.greenAccent[500] }}>
        <b>{props.label}</b>
      </span>
    </Button>
  )
}

export default FantasyButtons
