import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import BottomNavigation from '@mui/material/BottomNavigation'
import Paper from '@mui/material/Paper'
import { styled, useTheme } from '@mui/material'
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction'
import { tokens } from '../../utils/theme'
const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: white;
  &.Mui-selected {
    color: #70d8bd;
  }
`)
interface Props {
  navigation: { label: string; icon: React.ReactNode }[]
  onChange: Function
  selected: number
}
const BottomNavigationComponent = (props: Props) => {
  const [value, setValue] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    setValue(props.selected)
  }, [props.selected])
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            props.onChange(newValue)
          }}
        >
          {props.navigation.map((nav, index) => {
            return <BottomNavigationAction key={`${nav.label}-${index}`} label={nav.label} icon={nav.icon} />
          })}
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
export default React.memo(BottomNavigationComponent)
