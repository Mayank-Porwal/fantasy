import React from 'react'
import { MenuItem, TextField, useTheme } from '@mui/material'
import { tokens } from '../../../utils/theme'
import { getDropdownCss } from './helper'
import { Grid } from '@mui/material'
interface OptionsInterface {
  id: string | number
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
    props.onChange(event)
  }
  const inputStyle = { WebkitBoxShadow: '0 0 0 1000px white inset !important' }
  return (
    <Grid container>
      <TextField
        fullWidth
        sx={getDropdownCss(colors).root}
        value={props.value ? props.value : null}
        onChange={handleChange}
        variant='outlined'
        id={props.id}
        name={props.id}
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
        select
        placeholder={props.placeholder ? props.placeholder : ''}
        InputLabelProps={{ style: { color: colors.primary[100] }, shrink: true }}
        InputProps={{
          style: { ...inputStyle },
        }}
        inputProps={{
          style: { ...inputStyle, width: '100%' },
        }}
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
    </Grid>
  )
}

export default FantasyDropdowns
