import { Checkbox, FormControlLabel, checkboxClasses, useTheme } from '@mui/material'
import { tokens } from '../../../utils/theme'
interface Props {
  id: string
  label: string
  onChange: Function
  value: boolean
  disabled?: boolean
}
const FantasyCheckbox = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={(event) => props.onChange(event)}
          checked={props.value}
          disabled={props.disabled ? props.disabled : false}
          sx={{
            [`&, &.${checkboxClasses.checked}`]: {
              color: colors.greenAccent[500],
            },
          }}
        />
      }
      label={props.label}
    />
  )
}

export default FantasyCheckbox
