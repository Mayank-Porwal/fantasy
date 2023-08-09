import { FormControlLabel } from '@mui/material'
import Switch from '@mui/material/Switch'

interface Props {
  value: boolean
  label: string
  onChange: Function
  name: string
  id: string
}
const FantasySwitch = (props: Props) => {
  return (
    <FormControlLabel
      control={
        <Switch
          inputProps={{ 'aria-label': 'controlled' }}
          checked={props.value ? props.value : false}
          onChange={() => props.onChange()}
          size='medium'
        />
      }
      label={props.label}
    />
  )
}

export default FantasySwitch
