import { Grid, useTheme } from '@mui/material'
import FantasyTextField from '../FormElements/TextFlied'
import { tokens } from '../../utils/theme'
import SearchIcon from '@mui/icons-material/Search'
import FantasyTabs from '../FantasyTabs'
import {
  DEFAULT_AVAILABLE_PLAYERS_TABS_DATA,
  NON_PLAYING_ELEVEN_BOX_SHADOW,
  PLAYING_ELEVEN_BOX_SHADOW,
} from './constants'
import { CaptainInterface, PLAYERS_INTERFACE } from '../../container/CreateTeam/types'
import Cards from '../Cards'
import { CREATE_TEAM_FLOW } from '../../container/CreateTeam/constants'
import { getPlayingEleven, getSelectedPlayersCount, getTabsDataByCurrentMatch } from './helper'
import { useState } from 'react'
import { CurrentMatch } from '../../utils/appActions/types'
interface Props {
  filter: boolean
  availablePlayers?: PLAYERS_INTERFACE[] | [] | null
  handleActions: Function
  flow?: string
  onSearch?: Function
  onTabsChange?: Function
  allPlayers?: PLAYERS_INTERFACE[] | [] | null
  tabsValue?: string
  handleChipSelection?: Function
  captainData?: CaptainInterface | null
  handleCardClick?: Function
  currentMatch?: CurrentMatch[] | null
}
const CardTable = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [searchText, setSearchText] = useState('')
  const onSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (props.onSearch) {
      setSearchText(event.target.value)
      props.onSearch(props.allPlayers, props.flow, event.target.value)
    }
  }
  const handleTabsChange = (tabsValue: string) => {
    if (props.onTabsChange) {
      props.onTabsChange(tabsValue, props.allPlayers, props.flow)
    }
  }
  return (
    <div>
      <Grid
        container
        direction='row'
        sx={{ backgroundColor: colors.primary[400], height: props.flow !== CREATE_TEAM_FLOW.ALL_PLAYERS ? '70px' : '' }}
        alignItems={'center'}
        justifyContent={''}
        spacing={0}
      >
        {props.flow === CREATE_TEAM_FLOW.ALL_PLAYERS && (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ marginRight: '10px' }}>
            <FantasyTextField
              required={false}
              id='searchAvailablePlayers'
              label='Search'
              onChange={onSearch}
              endAdornment={<SearchIcon />}
              value={searchText}
            />
          </Grid>
        )}
        {props.filter && (
          <Grid
            item
            xs={12}
            sm={12}
            md={props.flow === CREATE_TEAM_FLOW.ALL_PLAYERS ? 7 : 12}
            lg={props.flow === CREATE_TEAM_FLOW.ALL_PLAYERS ? 7 : 12}
            xl={props.flow === CREATE_TEAM_FLOW.ALL_PLAYERS ? 7 : 12}
          >
            <FantasyTabs
              flow={props.flow}
              tabsData={getTabsDataByCurrentMatch(props.currentMatch ? true : true, props.flow)}
              onChange={handleTabsChange}
              value={props.tabsValue ? props.tabsValue : ''}
              dataCount={getSelectedPlayersCount(props.allPlayers ? props.allPlayers : [])}
            />
          </Grid>
        )}
      </Grid>
      <div
        style={{
          backgroundColor: colors.primary[400],
          height: '80vh',
          overflowY: 'auto',
          marginTop: '1%',
        }}
      >
        {props.availablePlayers &&
          props.availablePlayers.map((player) => {
            return (
              <div
                key={player.id}
                style={{
                  width: '100%',
                  padding: '2px',
                  boxShadow: getPlayingEleven(player, props.currentMatch)
                    ? PLAYING_ELEVEN_BOX_SHADOW
                    : NON_PLAYING_ELEVEN_BOX_SHADOW,
                  borderLeft: getPlayingEleven(player, props.currentMatch)
                    ? `4px solid${colors.greenAccent[400]}`
                    : 'none',
                }}
              >
                <Cards
                  handleCardClick={props.handleCardClick}
                  flow={props.flow ? props.flow : CREATE_TEAM_FLOW.ALL_PLAYERS}
                  keyItem={`${player.id}`}
                  player={player}
                  handleActions={props.handleActions}
                  handleChipSelection={props.handleChipSelection}
                  captainData={props.captainData}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CardTable
