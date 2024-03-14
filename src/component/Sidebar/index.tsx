import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { tokens } from '../../utils/theme'
import { Link, NavLink } from 'react-router-dom'
import GroupsIcon from '@mui/icons-material/Groups'
import LanIcon from '@mui/icons-material/Lan'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Cookies from 'js-cookie'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { useDispatch, useSelector } from 'react-redux'
import { updateToggleData } from '../../utils/appActions/actions'
import { RootState } from '../../utils/store/rootReducer'
import CloseIcon from '@mui/icons-material/Close'
interface ItemInterface {
  title: string
  to: string
  selected: string
  setSelected: Function
  icon: any
}
const Item = ({ title, to, icon, selected, setSelected }: ItemInterface) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const handleOnClick = () => {
    setSelected(title)
  }
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => handleOnClick()}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const AppSidebar = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const [selected, setSelected] = useState('Dashboard')
  const [toggled, setToggled] = useState(false)
  const propsState = useSelector((state: RootState) => {
    return {
      toggleData: state.appReducer.toggleData,
    }
  })
  useEffect(() => {
    const handleResize = () => {
      // Perform actions on window resize
      if (window.innerWidth < 768) {
        dispatch(updateToggleData({ ...propsState.toggleData, isMobile: true }))
      } else {
        dispatch(updateToggleData({ ...propsState.toggleData, isMobile: false }))
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const handleToggledState = (value: boolean) => {
    dispatch(updateToggleData({ ...propsState.toggleData, toggled: value }))
  }
  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        toggled={propsState.toggleData.toggled}
        onToggle={(value) => handleToggledState(value)}
        breakPoint='md'
      >
        <SidebarHeader>
          <Menu iconShape='circle'>
            {/* LOGO AND MENU ICON */}
            {isCollapsed ? (
              <MenuItem icon={<KeyboardDoubleArrowRightIcon />} onClick={() => setIsCollapsed(!isCollapsed)}></MenuItem>
            ) : (
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <KeyboardDoubleArrowRightIcon /> : undefined}
                style={{
                  margin: '10px 0 20px 0',
                  color: colors.grey[100],
                }}
              >
                {!isCollapsed && (
                  <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
                    <Typography variant='h3' color={colors.greenAccent[500]}>
                      Fantasy Baazi
                    </Typography>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
            )}
            {!isCollapsed && (
              <Box mb='25px'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <AccountCircleIcon
                    sx={{
                      width: '100px',
                      height: '100px',
                    }}
                  />
                </Box>
                <Box textAlign='center'>
                  <Typography
                    variant='h2'
                    color={colors.grey[100]}
                    fontWeight='bold'
                    sx={{ fontSize: '20px', m: '10px 0 0 0' }}
                  >
                    {Cookies.get('first_name')
                      ? `${Cookies.get('first_name')} ${Cookies.get('last_name') ? Cookies.get('last_name') : ''}`
                      : ''}
                  </Typography>
                  <Typography variant='h5' color={colors.greenAccent[500]}>
                    {Cookies.get('email') ? Cookies.get('email') : ''}
                  </Typography>
                </Box>
              </Box>
            )}
          </Menu>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape='circle'>
            {/* <Item
              title='Dashboard'
              selected={selected}
              to='/home'
              setSelected={setSelected}
              icon={<HomeOutlinedIcon />}
            /> */}
            <Item
              title='Manage Leagues'
              to='/manage-league?type=my-leagues'
              icon={<LanIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Manage Teams'
              to='/teams'
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Menu>
          {/* <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/home'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant='h6' color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
              League
            </Typography>
            <Item
              title='Manage Leagues'
              to='/manage-league?type=my-leagues'
              icon={<LanIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Manage Teams'
              to='/teams'
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          {/*<Item
              title="Invoices Balances"
              to="/"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

          {/*    <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          {/* </Box> */}
        </SidebarContent>
      </ProSidebar>
    </Box>
  )
}

export default AppSidebar
