import React, { useState, useEffect } from 'react'
import { Card, CardActionArea, CardContent, FormGroup, Grid, Typography } from '@mui/material'
import FantasyTextField from '../../../component/FormElements/TextFlied'
import { DEFAULT_ERROR_DATA, DEFAULT_REGISTER_FORM_DATA } from './constants'
import { RegisterFormDataInterface } from './types'
import FantasyButtons from '../../../component/FormElements/Buttons'
import { ButtonTypes, PHONE_NUMBER_REGEX } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerFailure, registerSuccess, signUp } from '../actions'
import { getDisabledState, getRegisterRequestBody, getValidCheck } from './helper'
import { RootState } from '../../../utils/store/rootReducer'
import { updateLoaderState, updateToastState } from '../../../utils/appActions/actions'
const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const propsState = useSelector((state: RootState) => {
    return {
      registerSuccess: state.loginReducer.registerSuccess,
      registerFailure: state.loginReducer.registerFailure,
    }
  })
  const [registerFormData, setRegisterFormData] = useState<RegisterFormDataInterface>(DEFAULT_REGISTER_FORM_DATA)
  const [formDataErrors, setFormDataErrors] = useState(DEFAULT_ERROR_DATA)
  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.target.id === 'phone_number') {
      if (PHONE_NUMBER_REGEX.test(e.target.value)) {
        const valid = getValidCheck(e.target.value, registerFormData, e.target.id, formDataErrors)
        setFormDataErrors(valid)
        setRegisterFormData({ ...registerFormData, [e.target.id]: e.target.value })
      }
    } else {
      const validCheck = getValidCheck(e.target.value, registerFormData, e.target.id, formDataErrors)
      setFormDataErrors(validCheck)
      setRegisterFormData({ ...registerFormData, [e.target.id]: e.target.value })
    }
  }
  const handleActions = (id: string) => {
    if (id === 'submit') {
      dispatch(updateLoaderState(true))
      const requestBody = getRegisterRequestBody(registerFormData)
      dispatch(signUp(requestBody))
    } else {
      navigate('/login')
    }
  }
  useEffect(() => {
    if (propsState.registerSuccess) {
      dispatch(updateLoaderState(false))
      dispatch(updateToastState({ message: propsState.registerSuccess.message, type: 'success' }))
      navigate('/login')
    }
    return () => {
      dispatch(registerSuccess(null))
    }
  }, [propsState.registerSuccess])
  useEffect(() => {
    if (propsState.registerFailure) {
      dispatch(updateLoaderState(false))
      dispatch(updateToastState({ message: propsState.registerFailure.message, type: 'error' }))
    }
    return () => {
      dispatch(registerFailure(null))
    }
  }, [propsState.registerFailure])
  return (
    <Grid container direction='row' alignItems={'center'} justifyContent={'center'} sx={{ height: '80vh' }}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant='h3' component='div' sx={{ textAlign: 'center' }}>
                Register
              </Typography>
              <form>
                <FormGroup>
                  <FantasyTextField
                    required
                    error={formDataErrors.firstName}
                    value={registerFormData.firstName}
                    id='firstName'
                    label='First Name'
                    onChange={handleFormChange}
                  />
                  <FantasyTextField
                    required
                    error={formDataErrors.lastName}
                    value={registerFormData.lastName}
                    id='lastName'
                    label='Last Name'
                    onChange={handleFormChange}
                  />
                  <FantasyTextField
                    required
                    error={formDataErrors.email}
                    value={registerFormData.email}
                    id='email'
                    label='Email'
                    onChange={handleFormChange}
                  />
                  <FantasyTextField
                    required={false}
                    error={formDataErrors.phone_number}
                    value={registerFormData.phone_number}
                    id='phone_number'
                    label='Phone'
                    onChange={handleFormChange}
                  />
                  <FantasyTextField
                    required
                    error={formDataErrors.password}
                    value={registerFormData.password}
                    id='password'
                    label='Password'
                    onChange={handleFormChange}
                    type='password'
                  />
                  <FantasyTextField
                    required
                    error={formDataErrors.confirmPassword}
                    value={registerFormData.confirmPassword}
                    id='confirmPassword'
                    label='Confirm Password'
                    onChange={handleFormChange}
                    type='password'
                  />
                </FormGroup>
              </form>
              <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ margin: '2%' }}>
                <FantasyButtons
                  id='submit'
                  label='Submit'
                  onClick={() => handleActions('submit')}
                  disabled={getDisabledState(formDataErrors, registerFormData)}
                  buttonType={ButtonTypes.CONTAINED}
                  width={'50%'}
                />
              </Grid>
              <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <Grid item xs={6} sm={6} md={6}>
                  <FantasyButtons
                    id='backToLogin'
                    label='Login'
                    onClick={() => handleActions('backToLogin')}
                    disabled={false}
                    buttonType={ButtonTypes.TEXT}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Register
