import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, useTheme } from '@mui/material'
import { tokens } from '../../../utils/theme'
import { getDropdownCss } from './helper'
interface OptionsInterface {
  id: string
  name: string
}
interface Props {
  id: string
  label: string
  value: string
  onChange: Function
  options: OptionsInterface[] | []
  required: boolean
  placeholder?: string
}
const styles = {
  root: {
    '& .MuiOutlinedInput-input': {
      color: 'green !important',
    },
    '& .MuiInputLabel-root': {
      color: 'green',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'green',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'red',
    },
    '&:hover .MuiInputLabel-root': {
      color: 'red',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: 'purple',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'purple',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'purple',
    },
  },
}
const FantasyDropdowns = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    console.log(event)
    props.onChange(event)
  }
  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      fullWidth
      sx={getDropdownCss(colors).root}
      value={props.value ? props.value : null}
      onChange={handleChange}
      variant='outlined'
      label={props.label}
      id={props.id}
      name={props.id}
      select
    >
      <MenuItem value={''}>
        <em>None</em>
      </MenuItem>
      {props.options &&
        props.options.map((option: OptionsInterface) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
        })}
    </TextField>
  )
}

export default FantasyDropdowns
