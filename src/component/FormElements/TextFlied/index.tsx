import { TextField, InputAdornment, useTheme } from '@mui/material'
import { tokens } from '../../../utils/theme'
interface Props {
  id: string
  label: string
  onChange: Function
  endAdornment?: any
  placeholder?: string
  type?: string
  autoComplete?: boolean | undefined
  error?: { error: boolean; message: string }
  value?: any
  required: boolean
  disabled?: boolean
}
const inputStyle = { WebkitBoxShadow: '0 0 0 1000px white inset !important' }
const FantasyTextField = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <TextField
      disabled={props.disabled ? props.disabled : false}
      name={props.id}
      type={props.type ? props.type : 'text'}
      fullWidth
      value={props.value ? props.value : ''}
      placeholder={props.placeholder ? props.placeholder : ''}
      label={
        props.required ? (
          <>
            {props.label}
            <span style={{ color: 'red' }}>*</span>
          </>
        ) : (
          props.label
        )
      }
      id={props.id}
      autoComplete={props.autoComplete ? 'on' : 'off'}
      error={props.error ? props.error.error : false}
      helperText={props.error ? props.error.message : ''}
      sx={{
        margin: '8px 0px',
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: colors.greenAccent[500],
          },
        },
      }}
      onChange={(e) => props.onChange(e)}
      InputLabelProps={{ style: { color: colors.primary[100] }, shrink: true }}
      InputProps={{
        endAdornment: props.endAdornment && <InputAdornment position='start'>{props.endAdornment}</InputAdornment>,
        style: { ...inputStyle },
      }}
      inputProps={{
        style: { ...inputStyle, width: '100%' },
      }}
    />
  )
}

export default FantasyTextField
