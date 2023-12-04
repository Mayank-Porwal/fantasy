import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { RootState } from '../../utils/store/rootReducer'
import React, { useEffect } from 'react'
import { tokens, useMode } from '../../utils/theme'
import {
  CircularProgress,
  CircularProgressProps,
  LinearProgress,
  LinearProgressProps,
  Stack,
  styled,
  useTheme,
} from '@mui/material'

const FantasyGlobalComponent = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const propsState = useSelector((state: RootState) => {
    return {
      notification: state.appReducer.notification,
      loader: state.appReducer.showLoader,
    }
  })
  useEffect(() => {
    if (propsState.notification && propsState.notification?.message) {
      switch (propsState.notification?.type) {
        case 'success':
          toast.success(propsState.notification?.message)
          break
        case 'error':
          toast.error(propsState.notification?.message)
          break
        case 'warning':
          toast.warn(propsState.notification?.message)
          break
        default:
          toast.info(propsState.notification?.message)
      }
    }
  }, [propsState.notification])
  return (
    <React.Fragment>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode}
      />
      {propsState.loader && (
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 1400,
            height: '100%',
            width: '100%',
            opacity: 0.2,
            background: '#ffffff',
          }}
        >
          <div
            style={{
              zIndex: 1501,
              //transform: 'translate(-50%, -50%)',
              color: 'white',
              background: 'transparent',
              opacity: 0.8,
            }}
          >
            <CircularProgress thickness={4} size={'6rem'} color='success' sx={{ color: colors.greenAccent[500] }} />
          </div>
        </Stack>
      )}
    </React.Fragment>
  )
}

export default FantasyGlobalComponent
