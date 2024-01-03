import { Card, CardActionArea, CardContent, FormGroup, Grid, Typography, useTheme } from '@mui/material'
import FantasyTextField from '../../../../component/FormElements/TextFlied'
import FantasyButtons from '../../../../component/FormElements/Buttons'
import { ButtonTypes } from '../../../../utils/constants'
import { useEffect, useState } from 'react'
import { UpdatePasswordFormDataInterface } from '../types'
import { DEFAULT_FORM_ERRORS, DEFAULT_UPDATE_PASSWORD_FORM_DATA } from './constants'
import { getDisabledCheck, getFormErrorState } from './helper'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../utils/store/rootReducer'
import { useNavigate } from 'react-router-dom'
import { tokens } from '../../../../utils/theme'

const UpdatePassword = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const propsState = useSelector((state: RootState) => {
    return {
      email: state.forgotPasswordReducer.email,
    }
  })
  const [updatePasswordForm, setUpdatePasswordForm] = useState<UpdatePasswordFormDataInterface>(
    DEFAULT_UPDATE_PASSWORD_FORM_DATA,
  )
  const [formErrors, setFormErrors] = useState<{
    password: { error: boolean; message: string }
    confirmPassword: { error: boolean; message: string }
  }>(DEFAULT_FORM_ERRORS)
  useEffect(() => {
    if (propsState.email) {
      navigate('/login')
    }
  }, [propsState.email])
  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const errorState = getFormErrorState(formErrors, e.target.id, e.target.value, updatePasswordForm)
    setFormErrors(errorState)
    setUpdatePasswordForm({
      ...updatePasswordForm,
      [e.target.id]: e.target.value,
    })
  }
  const handleActions = () => {}
  return (
    <Grid container direction='row' alignItems={'center'} justifyContent={'center'} sx={{ height: '80vh' }}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardActionArea>
            <CardContent sx={{ cursor: 'default' }}>
              <Typography gutterBottom variant='h3' component='div' sx={{ textAlign: 'center' }}>
                Update Password
              </Typography>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{ textAlign: 'center', color: colors.greenAccent[500] }}
              >
                {propsState.email} ABCD
              </Typography>
              <form>
                <FormGroup>
                  <FantasyTextField
                    required
                    error={formErrors.password}
                    value={updatePasswordForm.password}
                    id='password'
                    label='Password'
                    onChange={handleFormChange}
                    type='password'
                  />
                  <FantasyTextField
                    required
                    error={formErrors.confirmPassword}
                    value={updatePasswordForm.confirmPassword}
                    id='confirmPassword'
                    label='Confirm Password'
                    onChange={handleFormChange}
                    type='password'
                  />
                </FormGroup>
              </form>
              <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <FantasyButtons
                  id='submit'
                  label='Submit'
                  onClick={() => handleActions()}
                  buttonType={ButtonTypes.CONTAINED}
                  width={'50%'}
                  disabled={getDisabledCheck(formErrors, updatePasswordForm)}
                />
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UpdatePassword
