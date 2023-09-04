import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardTable from '../../component/CardTable'
import { updateToastState } from '../../utils/appActions/actions'
import { RootState } from '../../utils/store/rootReducer'
import { createTeam, getAllPlayers, updateSelectedPlayers } from './actions'
import { CREATE_TEAM_FLOW, CREATE_TEAM_VALIDATION_MESSAGES } from './constants'
import {
  checkMaximumPlayerAllowedValidation,
  createTeamRequestBody,
  getFilteredData,
  minimumPlayersByCategory,
  searchAvailablePlayers,
  setCaptainAndViceCaptain,
  updatePlayerList,
} from './helper'
import { CaptainInterface, PLAYERS_INTERFACE } from './types'
import { MAXIMUM_ALLOWED_PLAYERS } from '../../utils/constants'
import FantasyTextField from '../../component/FormElements/TextFlied'
import { useLocation } from 'react-router-dom'
import FantasyDropdowns from '../../component/FormElements/FantasyDropdowns'
const CreateTeam = () => {
  const propsState = useSelector((state: RootState) => {
    return {
      allPlayer: state.createTeamReducer.allPlayers,
      allPlayerError: state.createTeamReducer.allPlayersFailure,
      selectedPlayers: state.createTeamReducer.selectedPlayers,
      teamSuccess: state.createTeamReducer.createTeamSuccess,
      teamFailure: state.createTeamReducer.createTeamFailure,
    }
  })
  const [filteredAllPlayers, setFilteredAllPlayers] = useState<PLAYERS_INTERFACE[] | []>(propsState.allPlayer)
  const [availablePlayers, setAvailablePlayers] = useState<PLAYERS_INTERFACE[] | []>(propsState.allPlayer)
  const [availableSelectedPlayers, setAvailableSelectedPlayers] = useState<PLAYERS_INTERFACE[] | []>([])
  const [tabsValue, setTabsValue] = useState<string>('all')
  const [availablePlayersSearch, setAvailablePlayersSearch] = useState<string>('')
  const [teamFormData, setTeamFormData] = useState<{ teamName: string; league: string }>({ league: '', teamName: '' })
  const [captainData, setCaptainData] = useState<CaptainInterface | null>(null)
  //const [searchSelectedPlayers, setSearchSelectedPlayers] = useState<string>('');
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    if (propsState.allPlayer && propsState.allPlayer.length === 0) {
      dispatch(getAllPlayers())
    }
    console.log(location)
    if (location && location.state) {
      const formData = { teamName: location.state.team, league: location.state.league_name }
      setTeamFormData(formData)
    }
  }, [])
  useEffect(() => {
    if (propsState.allPlayer) {
      setAvailablePlayers(propsState.allPlayer)
      setFilteredAllPlayers(propsState.allPlayer)
    }
  }, [propsState.allPlayer])
  useEffect(() => {
    if (propsState.allPlayerError) {
      dispatch(updateToastState({ message: propsState.allPlayerError, type: 'error' }))
    }
  }, [propsState.allPlayerError])
  const handleActions = (data: PLAYERS_INTERFACE, flow: string) => {
    if (flow === CREATE_TEAM_FLOW.ALL_PLAYERS) {
      if (checkMaximumPlayerAllowedValidation(availableSelectedPlayers, teamFormData.teamName, captainData)) {
        const { allPlayers, selectedPlayers } = updatePlayerList(data, availablePlayers, propsState.selectedPlayers)
        setAvailablePlayers(allPlayers)
        const filteredData = getFilteredData(allPlayers, tabsValue, availablePlayersSearch)
        setFilteredAllPlayers(filteredData)
        dispatch(updateSelectedPlayers(selectedPlayers))
        setAvailableSelectedPlayers(selectedPlayers)
      } else {
        dispatch(
          updateToastState({
            message: CREATE_TEAM_VALIDATION_MESSAGES.MAXIMUM_ALLOWED_PLAYERS,
            type: 'error',
          }),
        )
      }
    } else {
      const { allPlayers, selectedPlayers } = updatePlayerList(data, propsState.selectedPlayers, availablePlayers)
      setAvailablePlayers(selectedPlayers)
      setFilteredAllPlayers(selectedPlayers)
      dispatch(updateSelectedPlayers(allPlayers))
      setAvailableSelectedPlayers(allPlayers)
    }
  }
  const handleOnSearch = (availPlayers: PLAYERS_INTERFACE[] | [], flow: string, searchString: string) => {
    if (flow === CREATE_TEAM_FLOW.ALL_PLAYERS) {
      const filterData = getFilteredData(availPlayers, tabsValue, searchString)
      setFilteredAllPlayers(filterData)
      setAvailablePlayersSearch(searchString)
    } else {
      const filterData = searchAvailablePlayers(availPlayers, searchString)
      dispatch(updateSelectedPlayers(filterData))
      //setSearchSelectedPlayers(searchString);
    }
  }
  const handleTabsChange = (tabsValue: string) => {
    setTabsValue(tabsValue)
    const availableData = getFilteredData(availablePlayers, tabsValue, availablePlayersSearch)
    setFilteredAllPlayers(availableData)
    //setAvailablePlayers(availableData);
  }
  const handleSaveTeam = () => {
    const validationCheck = minimumPlayersByCategory(availableSelectedPlayers)
    if (!validationCheck.error) {
      const requestBody = createTeamRequestBody(availableSelectedPlayers, teamFormData.teamName, captainData)
      dispatch(createTeam(requestBody))
    } else {
      dispatch(updateToastState({ message: validationCheck.message, type: 'error' }))
    }
  }
  const handleTeamNameChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const formData = {
      ...teamFormData,
      [event.target.id]: event.target.value,
    }
    setTeamFormData(formData)
  }
  useEffect(() => {
    if (propsState.teamSuccess && propsState.teamSuccess.message) {
      dispatch(updateToastState({ message: propsState.teamSuccess.message, type: 'success' }))
    }
  }, [propsState.teamSuccess])
  useEffect(() => {
    if (propsState.teamFailure) {
      dispatch(updateToastState({ message: propsState.teamFailure.message, type: 'error' }))
    }
  }, [propsState.teamFailure])
  const handleChipSelection = (type: string, player: PLAYERS_INTERFACE) => {
    const data = setCaptainAndViceCaptain(type, player, captainData)
    setCaptainData(data)
  }
  return (
    <>
      <Grid container direction='row' sx={{ margin: '2% 0%' }}>
        <Typography variant='h2' sx={{ fontWeight: 'bold' }}>
          Create Team
        </Typography>
      </Grid>
      <Grid container direction={'row'} sx={{ margin: '2% 0%' }} alignItems={'center'} spacing={2}>
        <Grid item xs={10}>
          <span>* {CREATE_TEAM_VALIDATION_MESSAGES.MINIMUM_PLAYERS_REQUIRED}</span>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant='outlined'
            color='secondary'
            disabled={checkMaximumPlayerAllowedValidation(availableSelectedPlayers, teamFormData.teamName, captainData)}
            onClick={handleSaveTeam}
            sx={{ fontWeight: 'bold' }}
          >
            Save Team
          </Button>
        </Grid>
      </Grid>
      <Grid container direction='row' sx={{ margin: '2% 0%' }} alignItems={'center'} spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <FantasyDropdowns
            options={[]}
            required
            placeholder={'Select League'}
            id={'league'}
            label={'League'}
            value={teamFormData.league ? teamFormData.league : ''}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleTeamNameChange(event)}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <FantasyTextField
            required
            placeholder={'Enter Team Name'}
            id={'teamName'}
            label={'Team Name'}
            value={teamFormData.teamName ? teamFormData.teamName : ''}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleTeamNameChange(event)}
          />
        </Grid>
      </Grid>
      <Grid container direction='row' spacing={2} alignItems={'center'} justifyContent={'center'}>
        <Grid item xs={12} sm={12} md={65} lg={6}>
          <CardTable
            filter={true}
            availablePlayers={filteredAllPlayers}
            handleActions={handleActions}
            flow={CREATE_TEAM_FLOW.ALL_PLAYERS}
            onSearch={handleOnSearch}
            onTabsChange={handleTabsChange}
            allPlayers={availablePlayers}
            tabsValue={tabsValue}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CardTable
            filter={true}
            availablePlayers={propsState.selectedPlayers}
            handleActions={handleActions}
            flow={CREATE_TEAM_FLOW.SELECTED_PLAYERS}
            allPlayers={availableSelectedPlayers}
            onSearch={handleOnSearch}
            captainData={captainData}
            handleChipSelection={handleChipSelection}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default CreateTeam
