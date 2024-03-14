import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardTable from '../../component/CardTable'
import { getCurrentMatch, updateLoaderState, updateToastState } from '../../utils/appActions/actions'
import { RootState } from '../../utils/store/rootReducer'
import {
  createTeam,
  fetchPreviousPrediction,
  getAllPlayers,
  getAllPlayersFailure,
  getTeamByIdAction,
  getTeamByIdActionFailure,
  getTeamByIdActionSuccess,
  predictWinnerAction,
  updateSelectedPlayers,
} from './actions'
import { CREATE_TEAM_FLOW, CREATE_TEAM_VALIDATION_MESSAGES, DEFAULT_SUBS_DATA, PREDICTION_SKIP } from './constants'
import {
  checkMaximumPlayerAllowedValidation,
  createTeamRequestBody,
  findLeagueById,
  getCapData,
  getCaptainDataFromSelectedTeam,
  getFilteredData,
  getPredictionRequestBody,
  getPreviousPredictionBorder,
  getPreviousPredictionRequestBody,
  getSubsAfterAddPlayer,
  getSubsDataAfterDelete,
  getUpdatedCapDataAfterAddPlayer,
  getUpdatedCapDataAfterDelete,
  getUpdatedCaptainData,
  getUpdatedLeagueOptions,
  maximumPlayerAllowedValidation,
  minimumPlayersByCategory,
  prePopulateSelectedPlayers,
  searchAvailablePlayers,
  setCaptainAndViceCaptain,
  updatePlayerList,
  updatedSelectedTeamByRemovingCaptainData,
} from './helper'
import { CaptainInterface, PLAYERS_INTERFACE } from './types'
import { DEFAULT_PAGE_NUMBER } from '../../utils/constants'
import FantasyTextField from '../../component/FormElements/TextFlied'
import { useLocation, useNavigate } from 'react-router-dom'
import FantasyDropdowns from '../../component/FormElements/FantasyDropdowns'
import { getLeaguesRequestBody } from '../ManageLeague/helper'
import { fetchLeagueAction, fetchLeagueDetailsActionSuccess } from '../ManageLeague/actions'
import PlayersStats from './PlayerStats/index'
import { tokens } from '../../utils/theme'
import { Transition } from '../ManageLeague/LeagueDetails/LeagueRules'
interface Props {
  [key: string]: any
}
const CreateTeam = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  window.history.replaceState({}, document.title)
  const propsState = useSelector((state: RootState) => {
    return {
      allPlayer: state.createTeamReducer.allPlayers,
      allPlayerError: state.createTeamReducer.allPlayersFailure,
      selectedPlayers: state.createTeamReducer.selectedPlayers,
      teamSuccess: state.createTeamReducer.createTeamSuccess,
      teamFailure: state.createTeamReducer.createTeamFailure,
      leagueData: state.leagueReducer.leagueData,
      selectedTeam: state.createTeamReducer.selectedTeam,
      selectedTeamFailure: state.createTeamReducer.selectedTeamFailure,
      currentMatch: state.appReducer.currentMatch,
      currentMatchFailure: state.appReducer.currentMatchFailure,
      predictedResult: state.createTeamReducer.prediction,
      predictedResultFailure: state.createTeamReducer.predictionFailure,
      previousPrediction: state.createTeamReducer.previousPrediction,
      previousPredictionFailure: state.createTeamReducer.previousPredictionFailure,
    }
  })
  const [filteredAllPlayers, setFilteredAllPlayers] = useState<PLAYERS_INTERFACE[] | []>(propsState.allPlayer)
  const [availablePlayers, setAvailablePlayers] = useState<PLAYERS_INTERFACE[] | []>(propsState.allPlayer)
  const [filteredSelectedPlayers, setFilteredSelectedPlayers] = useState<PLAYERS_INTERFACE[] | []>(
    propsState.selectedPlayers,
  )
  const [availableSelectedPlayers, setAvailableSelectedPlayers] = useState<PLAYERS_INTERFACE[] | []>([])
  const [tabsValue, setTabsValue] = useState<string>('all')
  const [availablePlayersSearch, setAvailablePlayersSearch] = useState<string>('')
  const [teamFormData, setTeamFormData] = useState<{
    teamName: string
    league: string
    teamId: number
    substitutions: number
  }>({
    league: '',
    teamName: '',
    teamId: 0,
    substitutions: -1,
  })
  const [subs, setSubs] = useState<number>(DEFAULT_SUBS_DATA)
  const [captainData, setCaptainData] = useState<CaptainInterface | null>(null)
  const [capData, setCapData] = useState(0)
  const [selectedPlayer, setSelectedPlayer] = useState<PLAYERS_INTERFACE | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  //const [searchSelectedPlayers, setSearchSelectedPlayers] = useState<string>('');
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    if (propsState.allPlayer && propsState.allPlayer.length === 0) {
      dispatch(updateLoaderState(true))
      dispatch(getAllPlayers())
    }
    const requestBody = getLeaguesRequestBody(null, DEFAULT_PAGE_NUMBER, 1000)
    dispatch(fetchLeagueAction(requestBody))
    dispatch(getCurrentMatch())
    return () => {
      setSubs(DEFAULT_SUBS_DATA)
      dispatch(getTeamByIdActionSuccess(null))
      dispatch(fetchLeagueDetailsActionSuccess(null))
    }
  }, [])
  useEffect(() => {
    if (propsState.selectedPlayers) {
      setFilteredSelectedPlayers(propsState.selectedPlayers)
    }
  }, [propsState.selectedPlayers])
  useEffect(() => {
    if (propsState.leagueData) {
      if (location && location.state) {
        const formData = {
          teamName: location.state.team_name,
          league: location.state.league_id,
          teamId: location.state.team_id,
          substitutions: location.state.remaining_subs ? location.state.remaining_subs : 150,
        }
        setSubs(location.state.remaining_subs ? location.state.remaining_subs : 150)
        dispatch(updateLoaderState(true))
        dispatch(getTeamByIdAction(location.state.team_id))
        //dispatch(fetchLeagueDetailsAction({ league_id: location.state.league_id }))
        setTeamFormData(formData)
      }
    }
  }, [propsState.leagueData])
  useEffect(() => {
    if (propsState.allPlayer) {
      if (propsState.allPlayer.length > 0) {
        setAvailablePlayers(propsState.allPlayer)
        setFilteredAllPlayers(propsState.allPlayer)
        dispatch(updateLoaderState(false))
      }
    }
  }, [propsState.allPlayer])
  useEffect(() => {
    if (propsState.allPlayerError) {
      dispatch(updateLoaderState(false))
      dispatch(updateToastState({ message: propsState.allPlayerError, type: 'error' }))
      return () => {
        dispatch(getAllPlayersFailure(null))
      }
    }
  }, [propsState.allPlayerError])
  const handleActions = (data: PLAYERS_INTERFACE, flow: string) => {
    if (flow === CREATE_TEAM_FLOW.ALL_PLAYERS) {
      const validationData = maximumPlayerAllowedValidation(availableSelectedPlayers, capData)
      if (validationData.flag) {
        const { allPlayers, selectedPlayers } = updatePlayerList(data, availablePlayers, propsState.selectedPlayers)
        setAvailablePlayers(allPlayers)
        const filteredData = getFilteredData(allPlayers, tabsValue, availablePlayersSearch, propsState.currentMatch)
        setFilteredAllPlayers(filteredData)
        dispatch(updateSelectedPlayers(selectedPlayers))
        setAvailableSelectedPlayers(selectedPlayers)
        const updatedSubs = getSubsAfterAddPlayer(
          subs,
          data,
          propsState.selectedTeam ? propsState.selectedTeam.last_submitted_team : null,
        )
        setSubs(updatedSubs)
        const updatedCapData = getUpdatedCapDataAfterAddPlayer(capData, data)
        setCapData(updatedCapData)
      } else {
        dispatch(
          updateToastState({
            message: validationData.message,
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
      const updatedSubs = getSubsDataAfterDelete(
        subs,
        data,
        propsState.selectedTeam ? propsState.selectedTeam.last_submitted_team : null,
      )
      setSubs(updatedSubs)
      const updatedCapData = getUpdatedCapDataAfterDelete(capData, data)
      setCapData(updatedCapData)
      const updatedCaptainData = getUpdatedCaptainData(captainData, data)
      setCaptainData(updatedCaptainData)
    }
  }
  const handleOnSearch = (availPlayers: PLAYERS_INTERFACE[] | [], flow: string, searchString: string) => {
    if (flow === CREATE_TEAM_FLOW.ALL_PLAYERS) {
      const filterData = getFilteredData(availPlayers, tabsValue, searchString, propsState.currentMatch)
      setFilteredAllPlayers(filterData)
      setAvailablePlayersSearch(searchString)
    } else {
      const filterData = searchAvailablePlayers(availPlayers, searchString)
      dispatch(updateSelectedPlayers(filterData))
      //setSearchSelectedPlayers(searchString);
    }
  }
  const handleTabsChange = (tabsValue: string, players: PLAYERS_INTERFACE[] | [], flow: string) => {
    setTabsValue(tabsValue)
    const availableData = getFilteredData(players, tabsValue, availablePlayersSearch, propsState.currentMatch)
    if (flow === CREATE_TEAM_FLOW.ALL_PLAYERS) {
      setFilteredAllPlayers(availableData)
    } else {
      setFilteredSelectedPlayers(availableData)
    }

    //setAvailablePlayers(availableData);
  }
  const handleSaveTeam = () => {
    const validationCheck = minimumPlayersByCategory(availableSelectedPlayers)
    if (!validationCheck.error) {
      dispatch(updateLoaderState(true))
      const requestBody = createTeamRequestBody(availableSelectedPlayers, teamFormData, captainData, subs)
      dispatch(createTeam(requestBody))
    } else {
      dispatch(updateToastState({ message: validationCheck.message, type: 'error' }))
    }
  }
  const handleTeamNameChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const formData = {
      ...teamFormData,
      [event.target.id || event.target.name]: event.target.value,
    }
    if (event.target.name && event.target.name === 'league') {
      if (event.target.value) {
        dispatch(updateLoaderState(true))
        const findSelectedLeague = findLeagueById(propsState.leagueData, parseInt(event.target.value))
        setTeamFormData({
          ...teamFormData,
          teamName: findSelectedLeague ? findSelectedLeague.team_name : '',
          teamId: findSelectedLeague ? findSelectedLeague.team_id : NaN,
          substitutions: findSelectedLeague ? findSelectedLeague.remaining_subs : 0,
          [event.target.id || event.target.name]: event.target.value,
        })
        //setSubs(findSelectedLeague ? findSelectedLeague.remaining_subs : 0)
        if (findSelectedLeague && findSelectedLeague.team_id) {
          dispatch(getTeamByIdAction(findSelectedLeague.team_id))
        } else {
          dispatch(updateLoaderState(false))
        }
      } else {
        formData.teamName = ''
        dispatch(getTeamByIdActionSuccess(null))
      }
    } else {
      setTeamFormData(formData)
    }
  }
  useEffect(() => {
    if (propsState.selectedTeam) {
      const { playersList, selectedPlayers } = prePopulateSelectedPlayers(propsState.selectedTeam, propsState.allPlayer)
      const updatedSelectedPlayers = updatedSelectedTeamByRemovingCaptainData(selectedPlayers)
      const updatedCaptainData = getCaptainDataFromSelectedTeam(selectedPlayers)
      setCaptainData(updatedCaptainData)
      setAvailablePlayers(playersList)
      setFilteredAllPlayers(playersList)
      dispatch(updateSelectedPlayers(updatedSelectedPlayers))
      setAvailableSelectedPlayers(updatedSelectedPlayers)
      dispatch(updateLoaderState(false))
      const updatedCapData = getCapData(updatedSelectedPlayers)
      setCapData(updatedCapData)
      setSubs(propsState.selectedTeam.substitutions)
    } else {
      setCaptainData(null)
      setAvailablePlayers(propsState.allPlayer)
      setFilteredAllPlayers(propsState.allPlayer)
      dispatch(updateSelectedPlayers([]))
      setAvailableSelectedPlayers([])
      setCapData(0)
      setSubs(0)
    }
  }, [propsState.selectedTeam])
  useEffect(() => {
    if (propsState.selectedTeamFailure) {
      dispatch(updateToastState({ message: propsState.selectedTeamFailure.message, type: 'error' }))
      dispatch(updateLoaderState(false))
    }
    return () => {
      dispatch(getTeamByIdActionFailure(null))
    }
  }, [propsState.selectedTeamFailure])
  useEffect(() => {
    if (propsState.teamSuccess && propsState.teamSuccess.message) {
      setOpen(true)
      const predictionRequestBody = getPreviousPredictionRequestBody(
        teamFormData,
        propsState.leagueData ? propsState.leagueData.data : [],
      )
      dispatch(fetchPreviousPrediction(predictionRequestBody))
      dispatch(updateToastState({ message: propsState.teamSuccess.message, type: 'success' }))
    }
  }, [propsState.teamSuccess])
  useEffect(() => {
    if (propsState.teamFailure) {
      dispatch(updateLoaderState(false))
      dispatch(updateToastState({ message: propsState.teamFailure.message, type: 'error' }))
    }
  }, [propsState.teamFailure])
  const handleChipSelection = (type: string, player: PLAYERS_INTERFACE) => {
    const data = setCaptainAndViceCaptain(type, player, captainData)
    setCaptainData(data)
  }
  const handleCardClick = (selectedPlayerData: PLAYERS_INTERFACE | null) => {
    setSelectedPlayer(selectedPlayerData)
  }
  const handleCloseStats = () => {
    setSelectedPlayer(null)
  }
  const handlePrediction = (selectedPrediction: string) => {
    dispatch(updateLoaderState(true))
    const predictionRequestBody = getPredictionRequestBody(
      selectedPrediction,
      teamFormData,
      propsState.leagueData ? propsState.leagueData.data : [],
    )
    dispatch(predictWinnerAction(predictionRequestBody))
  }
  useEffect(() => {
    if (propsState.predictedResult) {
      setOpen(false)
      dispatch(updateLoaderState(false))
      dispatch(updateToastState({ message: propsState.predictedResult, type: 'success' }))
    }
  }, [propsState.predictedResult])
  useEffect(() => {
    if (propsState.predictedResultFailure) {
      setOpen(false)
      dispatch(updateLoaderState(false))
      dispatch(updateToastState({ message: propsState.predictedResultFailure.message, type: 'error' }))
    }
  }, [propsState.predictedResultFailure])
  useEffect(() => {
    if (propsState.previousPrediction) {
      dispatch(updateLoaderState(false))
    }
  }, [propsState.previousPrediction])
  useEffect(() => {
    if (propsState.previousPredictionFailure) {
      dispatch(updateLoaderState(false))
    }
  }, [propsState.previousPredictionFailure])
  return (
    <>
      <Grid container direction='row' sx={{ margin: '2% 0%' }}>
        <Typography variant='h2' sx={{ fontWeight: 'bold' }}>
          Manage Teams
        </Typography>
      </Grid>
      <div style={{ margin: '2% 0%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span>* {CREATE_TEAM_VALIDATION_MESSAGES.MINIMUM_PLAYERS_REQUIRED}</span>
        </div>
        <div>
          <Button
            variant='outlined'
            color='secondary'
            disabled={checkMaximumPlayerAllowedValidation(availableSelectedPlayers, teamFormData, captainData)}
            onClick={handleSaveTeam}
            sx={{ fontWeight: 'bold' }}
          >
            Save Team
          </Button>
        </div>
      </div>
      <Grid container direction='row' sx={{ margin: '2% 0%' }} alignItems={'center'} spacing={2}>
        <Grid item xs={12} sm={3} md={3}>
          <FantasyDropdowns
            options={propsState.leagueData ? getUpdatedLeagueOptions(propsState.leagueData.data) : []}
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
            disabled={true}
          />
        </Grid>

        <Grid item xs={12} sm={3} md={3}>
          Remaining Substitutions:{' '}
          <span style={{ fontWeight: '600', color: colors.greenAccent[400] }}>{subs ? subs : 0}</span>
        </Grid>
        <Grid item xs={12} sm={1} md={1}>
          Cap: <span style={{ fontWeight: '600', color: colors.greenAccent[400] }}>{capData ? capData : 0}</span>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          {propsState.currentMatch && (
            <div>
              <div style={{ textAlign: 'center', fontWeight: '600', marginBottom: '1%' }}>Current Match</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <div>
                  <img width={25} height={25} src={propsState.currentMatch.teamA.image} />
                </div>
                <div>Vs</div>
                <div>
                  <img width={25} height={25} src={propsState.currentMatch.teamB.image} />
                </div>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
      {selectedPlayer && (
        <Grid container direction='row' spacing={2} alignItems={'center'}>
          <PlayersStats selectedPlayer={selectedPlayer} closeStats={handleCloseStats} />
        </Grid>
      )}
      <Grid container direction='row' spacing={2} alignItems={'center'} justifyContent={'center'}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CardTable
            filter={true}
            availablePlayers={filteredAllPlayers}
            handleActions={handleActions}
            flow={CREATE_TEAM_FLOW.ALL_PLAYERS}
            onSearch={handleOnSearch}
            onTabsChange={handleTabsChange}
            allPlayers={availablePlayers}
            tabsValue={tabsValue}
            handleCardClick={handleCardClick}
            currentMatch={propsState.currentMatch}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <CardTable
            filter={true}
            availablePlayers={filteredSelectedPlayers}
            handleActions={handleActions}
            flow={CREATE_TEAM_FLOW.SELECTED_PLAYERS}
            allPlayers={availableSelectedPlayers}
            onSearch={handleOnSearch}
            captainData={captainData}
            handleChipSelection={handleChipSelection}
            onTabsChange={handleTabsChange}
            handleCardClick={handleCardClick}
          />
        </Grid>
        <Dialog fullWidth={false} open={open} TransitionComponent={Transition}>
          <DialogTitle sx={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>Predict Winner</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div style={{ textAlign: 'center' }}>Who's gonna win today's match</div>
              <div>(Prediction result will effect your points)</div>
            </DialogContentText>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '8% 4%  0 4%', justifyContent: 'space-between' }}
            >
              <div
                style={{
                  border: `${
                    getPreviousPredictionBorder(propsState.previousPrediction, propsState.currentMatch, 'teamA')
                      ? `1px solid ${colors.greenAccent[400]}`
                      : 'none'
                  }`,
                  padding: '2%',
                }}
              >
                {propsState.currentMatch && (
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePrediction(propsState.currentMatch ? propsState.currentMatch.teamA.name : '')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img width='25' height='25' src={propsState.currentMatch.teamA.image} />
                    </div>
                    <div>({propsState.currentMatch.teamA.name})</div>
                  </div>
                )}
              </div>
              <div>Vs</div>
              <div
                style={{
                  border: `${
                    getPreviousPredictionBorder(propsState.previousPrediction, propsState.currentMatch, 'teamB')
                      ? `1px solid ${colors.greenAccent[400]}`
                      : 'none'
                  }`,
                  padding: '2%',
                }}
              >
                {propsState.currentMatch && (
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePrediction(propsState.currentMatch ? propsState.currentMatch.teamB.name : '')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img width='25' height='25' src={propsState.currentMatch.teamB.image} />
                    </div>
                    <div>{propsState.currentMatch.teamB.name}</div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: colors.greenAccent[400] }} onClick={() => handlePrediction(PREDICTION_SKIP)}>
              No Prediction
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  )
}

export default CreateTeam
