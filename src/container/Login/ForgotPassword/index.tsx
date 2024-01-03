import { Card, CardActionArea, CardContent, FormGroup, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FantasyTextField from '../../../component/FormElements/TextFlied'
import { DEFAULT_FORGOT_PASSWORD_DATA, DEFAULT_FORGOT_PASSWORD_ERROR_DATA } from './constants'
import { ForgotPasswordFormInterface } from './types'
import FantasyButtons from '../../../component/FormElements/Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { updateLoaderState, updateToastState } from '../../../utils/appActions/actions'
import { useNavigate } from 'react-router-dom'
import { ButtonTypes } from '../../../utils/constants'
import { tokens } from '../../../utils/theme'
import { getDisabledState, getForgotPasswordErrorState, updateForgotPasswordFormData } from './helper'
import { sendOtp, sendOtpSuccess } from './actions'
import { RootState } from '../../../utils/store/rootReducer'
const ForgotPassword = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const propsState = useSelector((state: RootState) => {
    return {
      sendOtpSuccess: state.forgotPasswordReducer.sendOtpSuccess,
      sendOtpFailure: state.forgotPasswordReducer.sendOtpFailure,
      verifyOtpSuccess: state.forgotPasswordReducer.verifyOtpSuccess,
      verifyOtpFailure: state.forgotPasswordReducer.verifyOtpFailure,
    }
  })
  const [forgotPasswordFormData, setForgotPasswordFormData] =
    useState<ForgotPasswordFormInterface>(DEFAULT_FORGOT_PASSWORD_DATA)
  const [formDataErrors, setFormDataErrors] = useState(DEFAULT_FORGOT_PASSWORD_ERROR_DATA)
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false)
  const [seconds, setSeconds] = useState(0)
  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const updatedErrorData = getForgotPasswordErrorState(formDataErrors, e.target.value, e.target.id)
    setFormDataErrors(updatedErrorData)
    const updatedData = updateForgotPasswordFormData(e.target.value, e.target.id, forgotPasswordFormData)
    setForgotPasswordFormData(updatedData)
  }
  const handleActions = (id: string) => {
    if (id === 'sendOtp') {
      dispatch(updateLoaderState(true))
      dispatch(sendOtp({ email: forgotPasswordFormData.email ? forgotPasswordFormData.email : '' }))
    } else if (id === 'resendOtp') {
      setSeconds(30)
    } else {
      navigate('/login')
    }
  }
  useEffect(() => {
    if (propsState.sendOtpSuccess) {
      setIsOtpSent(true)
      setSeconds(30)
      dispatch(updateLoaderState(false))
    }
    return () => {
      dispatch(sendOtpSuccess(null))
    }
  }, [propsState.sendOtpSuccess])
  useEffect(() => {
    if (propsState.sendOtpFailure) {
      dispatch(updateLoaderState(false))
      dispatch(updateToastState({ message: propsState.sendOtpFailure.message, type: 'error' }))
    }
  }, [propsState.sendOtpFailure])
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        clearInterval(interval)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [seconds])
  return (
    <Grid container direction='row' alignItems={'center'} justifyContent={'center'} sx={{ height: '80vh' }}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardActionArea>
            <CardContent sx={{ cursor: 'default' }}>
              <Typography gutterBottom variant='h3' component='div' sx={{ textAlign: 'center' }}>
                Forgot Password
              </Typography>
              <form>
                <FormGroup>
                  <FantasyTextField
                    required
                    error={formDataErrors.email}
                    value={forgotPasswordFormData.email}
                    id='email'
                    label='Email'
                    onChange={handleFormChange}
                  />
                  {isOtpSent && (
                    <FantasyTextField
                      required
                      error={formDataErrors.otp}
                      value={forgotPasswordFormData.otp}
                      id='otp'
                      label='OTP'
                      onChange={handleFormChange}
                    />
                  )}
                </FormGroup>
              </form>
              <Grid container direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <FantasyButtons
                  id='sendOtp'
                  label={isOtpSent ? 'Verify' : 'Send OTP'}
                  onClick={() => handleActions(isOtpSent ? 'verify' : 'sendOtp')}
                  buttonType={ButtonTypes.CONTAINED}
                  width={'50%'}
                  disabled={getDisabledState(formDataErrors, isOtpSent, forgotPasswordFormData)}
                />
              </Grid>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '4% 0' }}>
                <div>
                  <span
                    id='backToLogin'
                    onClick={() => handleActions('backToLogin')}
                    style={{ color: colors.greenAccent[500], cursor: 'pointer' }}
                  >
                    Login
                  </span>
                </div>
                {isOtpSent && (
                  <div>
                    <span
                      id='resendOtp'
                      onClick={() => handleActions('resendOtp')}
                      style={{ cursor: 'pointer', color: seconds === 0 ? colors.greenAccent[500] : colors.grey[500] }}
                    >
                      {`Re-send OTP ${seconds > 0 ? `(${seconds}s)` : ''}`}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ForgotPassword
