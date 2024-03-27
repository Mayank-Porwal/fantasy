import { Card, CardContent, CardMedia, Grid, Icon, Typography, useTheme } from '@mui/material'
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
import { getPlayingEleven, getSelectedPlayersCount, getSortingIcon, getTabsDataByCurrentMatch } from './helper'
import React, { useState } from 'react'
import { CurrentMatch } from '../../utils/appActions/types'
import FantasyDropdowns from '../FormElements/FantasyDropdowns'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/store/rootReducer'
import DropdownMenu from '../DropdownMenu'
interface Props {
  filter: boolean
  availablePlayers?: PLAYERS_INTERFACE[] | [] | null
  handleActions: Function
  flow: string
  onSearch?: Function
  onTabsChange?: Function
  allPlayers?: PLAYERS_INTERFACE[] | [] | null
  tabsValue?: string
  handleChipSelection?: Function
  captainData?: CaptainInterface | null
  handleCardClick?: Function
  currentMatch?: CurrentMatch[] | null
  sortingCallback?: Function
  sortingData?: { direction: string; flow: string } | null
  handleTeamFilterCallback?: Function
  selectedTeamFilter?: string[]
}
const CardTable = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [searchText, setSearchText] = useState('')
  const propsState = useSelector((state: RootState) => {
    return {
      teamsOptions: state.appReducer.iplTeamsOptions,
    }
  })
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
  const handleCapSort = () => {
    if (props.sortingCallback) {
      props.sortingCallback(props.flow)
    }
  }
  const handleIplTeamFilter = (value: string[], currentValue: string) => {
    if (props.handleTeamFilterCallback) {
      if (currentValue === 'Current Match') {
        props.handleTeamFilterCallback(['Current Match'])
      } else {
        const findCurrentMatchIndex = value.findIndex((x) => x === 'Current Match')
        if (findCurrentMatchIndex > -1) {
          value.splice(findCurrentMatchIndex, 1)
        }
        props.handleTeamFilterCallback(value)
      }
      setSearchText('')
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
          <React.Fragment>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} sx={{ padding: '0 1%' }}>
              {/* <FantasyDropdowns
                options={propsState.teamsOptions ? propsState.teamsOptions : []}
                required
                placeholder={'Select League'}
                id={'league'}
                label={'Team'}
                value={props.selectedTeamFilter ? props.selectedTeamFilter : ''}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                  handleIplTeamFilter(event)
                }
              /> */}
              {/* <FantasyMultiselect
                options={propsState.teamsOptions ? propsState.teamsOptions : []}
                required
                placeholder={'Select League'}
                id={'league'}
                label={'Team'}
                value={props.selectedTeamFilter ? props.selectedTeamFilter : []}
                onChange={(value: string[]) => handleIplTeamFilter(value)}
              /> */}
              <DropdownMenu
                options={propsState.teamsOptions ? propsState.teamsOptions : []}
                divider={{ index: 1, isDivider: true, text: 'OR' }}
                checkbox={true}
                value={props.selectedTeamFilter ? props.selectedTeamFilter : []}
                onChange={(value: string[], currentValue: string) => handleIplTeamFilter(value, currentValue)}
              />
            </Grid>
            <Grid item xs={11} sm={11} md={4} lg={4} xl={4}>
              <FantasyTextField
                required={false}
                id='searchAvailablePlayers'
                label='Search'
                onChange={onSearch}
                endAdornment={<SearchIcon />}
                value={searchText}
              />
            </Grid>
          </React.Fragment>
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
          marginBottom: '1%',
        }}
      >
        <Card sx={{ display: 'flex', width: '100%', cursor: props.handleCardClick ? 'pointer' : '' }}>
          <div style={{ width: '100px' }}></div>
          <CardContent sx={{ width: '100%' }}>
            <Grid container direction='row' alignItems={'center'} justifyContent={'center'}>
              <Grid item xs={4}>
                Name
              </Grid>
              <Grid item xs={props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS ? 2 : 4}>
                Team
              </Grid>
              <Grid item xs={props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS ? 2 : 3}>
                <span onClick={handleCapSort} style={{ display: 'flex', alignItems: 'center' }}>
                  Cap {props.flow === CREATE_TEAM_FLOW.ALL_PLAYERS ? getSortingIcon(props.sortingData, props.flow) : ''}
                  {props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS
                    ? getSortingIcon(props.sortingData, props.flow)
                    : ''}
                </span>
              </Grid>
              {props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS && (
                <Grid item xs={3}>
                  Stars
                </Grid>
              )}
              <Grid item xs={1}></Grid>
            </Grid>
          </CardContent>
        </Card>
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
                  border: getPlayingEleven(player, props.currentMatch) ? `2px solid${colors.greenAccent[400]}` : 'none',
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
                  playingFlag={getPlayingEleven(player, props.currentMatch)}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default CardTable
