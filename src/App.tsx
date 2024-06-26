import React, { memo, useEffect, useMemo, useState } from 'react'
import './App.css'
//import { HTTPS_HEADERS, REQUEST_TYPE } from './utils/constants';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider, useDispatch, useSelector } from 'react-redux/es/exports'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import FantasyGlobalComponent from './component/FantasyGlobalComponent'
import Header from './component/Header'
import AppSidebar from './component/Sidebar'
import { updateLoggedInStatus } from './utils/appActions/actions'
import { checkIfLoggedIn } from './utils/helper'
import RouteComponent from './utils/routes'
import { RootState } from './utils/store/rootReducer'
import { store } from './utils/store/store'
import { ColorModeContext, useMode } from './utils/theme'
import CustomizedDialogs from './component/Popup'
import { socket } from './utils/sockets'
import { BACKGROUND_PAGES } from './utils/constants'
import clsx from 'clsx'
function App() {
  return (
    <Provider store={store}>
      <Application />
    </Provider>
  )
}
const Application = () => {
  const [theme, colorMode] = useMode()
  const dispatch = useDispatch()
  const page = useMemo(() => {
    if (window.location) {
      return window.location.pathname
    } else {
      return ''
    }
  }, [window.location.pathname])
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const propsState = useSelector((state: RootState) => {
    return {
      isLoggedIn: state.appReducer.isLoggedIn,
      loader: state.appReducer.showLoader,
    }
  })
  useEffect(() => {
    dispatch(updateLoggedInStatus(checkIfLoggedIn()))
  }, [])
  useEffect(() => {
    setIsLoggedIn(propsState.isLoggedIn)
  }, [propsState.isLoggedIn])
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={BACKGROUND_PAGES.includes(page) ? clsx('app', 'background-app-image') : 'app'}>
          <BrowserRouter>
            {isLoggedIn && <AppSidebar />}
            <main className='content'>
              {isLoggedIn && <Header />}
              <div className='route-container'>
                <RouteComponent />
                <FantasyGlobalComponent />
                <CustomizedDialogs />
                {/* Same as */}
              </div>
            </main>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export default memo(App)
