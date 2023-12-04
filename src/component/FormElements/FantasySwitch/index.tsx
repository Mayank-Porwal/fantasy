import { FormControlLabel, useTheme } from '@mui/material'
import Switch from '@mui/material/Switch'
import { tokens } from '../../../utils/theme'

interface Props {
  value: boolean
  label: string
  onChange: Function
  name: string
  id: string
}
const FantasySwitch = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <FormControlLabel
      control={
        <Switch
          inputProps={{ 'aria-label': 'controlled' }}
          checked={props.value ? props.value : false}
          onChange={() => props.onChange()}
          size='medium'
          color={'secondary'}
        />
      }
      label={props.label}
    />
  )
}

export default FantasySwitch
