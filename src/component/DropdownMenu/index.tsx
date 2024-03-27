import * as React from 'react'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import ArchiveIcon from '@mui/icons-material/Archive'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FilterListIcon from '@mui/icons-material/FilterList'
import { OptionsInterface } from '../../utils/appActions/types'
import { Badge, Checkbox } from '@mui/material'
import { tokens } from '../../utils/theme'
import { cloneDeep } from 'lodash'
import CloseIcon from '@mui/icons-material/Close'
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}))
interface Props {
  options: OptionsInterface[]
  divider: { index: number; isDivider: boolean; text: string }
  value: string[]
  checkbox: boolean
  onChange: Function
}
const DropdownMenu = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [menuValue, setMenuValue] = React.useState<string[]>([])
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  React.useEffect(() => {
    setMenuValue(props.value)
  }, [props.value])
  const handleCheckbox = (value: OptionsInterface) => {
    const updatedValue = cloneDeep(menuValue)
    const findValueIndex = updatedValue.findIndex((x) => x === value.id)
    if (findValueIndex > -1) {
      updatedValue.splice(findValueIndex, 1)
      props.onChange(updatedValue)
    } else {
      props.onChange(updatedValue.concat(value.name), value.name)
    }
  }
  const handleBadgeClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    props.onChange([], '')
  }
  return (
    <div>
      <span style={{ cursor: 'pointer' }} onClick={handleClick}>
        {props.value && props.value.length > 0 ? (
          <Badge
            badgeContent={
              <span onClick={handleBadgeClick}>
                <CloseIcon sx={{ fontSize: '10px' }} />
              </span>
            }
            color='primary'
          >
            <FilterListIcon />
          </Badge>
        ) : (
          <span>
            <FilterListIcon />
          </span>
        )}
      </span>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {props.options &&
          props.options.map((option, index) => {
            if (props.divider.isDivider && index === props.divider.index) {
              return (
                <React.Fragment key={index}>
                  <Divider sx={{ my: 0.5, color: 'white' }}>{props.divider.text}</Divider>
                  <MenuItem disableRipple>
                    <Checkbox
                      sx={{
                        color: colors.greenAccent[400],
                        '&.Mui-checked': {
                          color: colors.greenAccent[400],
                        },
                      }}
                      id={option.id.toString()}
                      onChange={() => handleCheckbox(option)}
                      checked={menuValue.find((x) => x === option.id) ? true : false}
                    />
                    {option.name}
                  </MenuItem>
                </React.Fragment>
              )
            } else {
              return (
                <MenuItem disableRipple key={index}>
                  <Checkbox
                    sx={{
                      color: colors.greenAccent[400],
                      '&.Mui-checked': {
                        color: colors.greenAccent[400],
                      },
                    }}
                    id={option.id.toString()}
                    onChange={() => handleCheckbox(option)}
                    checked={menuValue.find((x) => x === option.id) ? true : false}
                  />
                  {option.name}
                </MenuItem>
              )
            }
          })}
      </StyledMenu>
    </div>
  )
}
export default React.memo(DropdownMenu)
