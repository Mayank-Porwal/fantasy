import { Card, CardContent, FormGroup, Grid, Typography, useTheme } from '@mui/material'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FantasyButtons from '../../component/FormElements/Buttons'
import FantasyCheckbox from '../../component/FormElements/Checkbox'
import FantasyTextField from '../../component/FormElements/TextFlied'
import { updateLoggedInStatus } from '../../utils/appActions/actions'
import { ButtonTypes } from '../../utils/constants'
import { RootState } from '../../utils/store/rootReducer'
import { tokens } from '../../utils/theme'
import { signIn } from './actions'
import { DEFAULT_LOGIN_ERRORS, DEFAULT_LOGIN_FORM_DATA } from './constants'
import { setUserDataToCookies, validationCheck, validationCheckDisabled } from './helper'
import { jwtDecode } from 'jwt-decode'
const Login = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(DEFAULT_LOGIN_FORM_DATA)
  const [formDataErrors, setFormDataErrors] = useState(DEFAULT_LOGIN_ERRORS)
  const propsState = useSelector((state: RootState) => {
    return {
      signInSuccess: state.loginReducer.signInSuccess,
      signInFailure: state.loginReducer.signInFailed,
    }
  })
  const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let data = JSON.parse(JSON.stringify(formData))
    data = {
      ...data,
      [event.target.id]: event.target.value,
    }
    const validData = validationCheck(data, formDataErrors)
    setFormDataErrors(validData)
    setFormData(data)
  }
  const handleActions = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.target.id === 'submit') {
      dispatch(signIn(formData))
    }
  }
  useEffect(() => {
    if (propsState.signInSuccess) {
      Cookies.set('jwtToken', propsState.signInSuccess.access_token)
      setUserDataToCookies(propsState.signInSuccess.access_token)
      navigate('/teams')
      dispatch(updateLoggedInStatus(true))
    }
  }, [propsState.signInSuccess])
  const handleFooterActions = (id: string) => {
    if (id === 'forgotPassword') {
    } else {
      navigate('/register')
    }
  }
  return (
    <Grid container direction='row' alignItems={'center'} justifyContent={'center'} sx={{ height: '80vh' }}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant='h3' component='div' sx={{ textAlign: 'center' }}>
              Login
            </Typography>
            <form>
              <FormGroup>
                <FantasyTextField
                  required
                  error={formDataErrors.email}
                  id='email'
                  label='Email'
                  onChange={handleFormChange}
                  value={formData.email}
                />
                <FantasyTextField
                  required
                  id='password'
                  label='Password'
                  onChange={handleFormChange}
                  type='password'
                  autoComplete={false}
                  error={formDataErrors.password}
                  value={formData.password}
                />
                <FantasyCheckbox id='rememberMe' label='Remember Me' onChange={handleFormChange} value={false} />
              </FormGroup>
            </form>
            <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ margin: '2%' }}>
              <FantasyButtons
                id='submit'
                label='Sign In'
                onClick={handleActions}
                disabled={validationCheckDisabled(formDataErrors)}
                buttonType={ButtonTypes.CONTAINED}
                width={'50%'}
              />
            </Grid>
            <Grid
              container
              direction={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              sx={{ padding: '3% 0%' }}
            >
              <Grid item xs={6} sm={6} md={6}>
                <span
                  style={{ display: 'flex', justifyContent: 'start', color: colors.greenAccent[500] }}
                  id='forgotPassword'
                  onClick={() => handleFooterActions('forgotPassword')}
                >
                  Forgot Password?
                </span>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <span
                  style={{ display: 'flex', justifyContent: 'end', color: colors.greenAccent[500] }}
                  id='signUp'
                  onClick={() => handleFooterActions('signUp')}
                >
                  Sign Up
                </span>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Login
