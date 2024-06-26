import { AppBar, Button, Dialog, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import LeaguePlayers from './LeaguePlayers'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeagueDetailsAction, fetchLeagueDetailsActionFailure } from '../actions'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../../utils/store/rootReducer'
import { updateToastState } from '../../../utils/appActions/actions'
import FantasyButtons from '../../../component/FormElements/Buttons'
import CloseIcon from '@mui/icons-material/Close'
import LeagueRules, { Transition } from './LeagueRules'
import { RulesDataInterface } from './types'
import { checkLeagueOwnerOrNot, getUpdateRulesRequestBody } from './helper'
import { updateRules, updateRulesFailure, updateRulesSuccess } from './actions'
import { socket } from '../../../utils/sockets'
import FantasyTabs from '../../../component/FantasyTabs'
import { LEAGUE_DETAILS_TABS_DATA } from './constants'
import { CREATE_TEAM_FLOW } from '../../CreateTeam/constants'
import LeagueLeaderBoard from './Leaderboard/index'
const LeagueDetails = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const propsState = useSelector((state: RootState) => {
    return {
      leagueDetailData: state.leagueReducer.leagueDetails,
      LeagueDetailDataFailure: state.leagueReducer.leagueDetailsFailure,
      updateRulesSuccess: state.leagueDetailsReducer.updateRulesSuccess,
      updateRulesFailure: state.leagueDetailsReducer.updateRulesFailure,
    }
  })
  const [leagueName, setLeagueName] = useState<string>('')
  const [leagueId, setLeagueId] = useState<string | null>('')
  const [open, setOpen] = useState<boolean>(false)
  const [updatedRulesData, setUpdatedRulesData] = useState<RulesDataInterface[] | null>(null)
  const [tabsValue, setTabsValue] = useState<string>('leagueHome')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const id = urlParams.get('league')
    const name = urlParams.get('leagueName')
    setLeagueId(id)
    if (id) {
      getLeagueData(id.toString())
    } else {
      navigate('/manage-league')
    }
    if (name) {
      setLeagueName(name)
    }
    return () => {
      dispatch(updateRulesSuccess(null))
      dispatch(updateRulesFailure(null))
    }
  }, [])
  useEffect(() => {
    if (propsState.LeagueDetailDataFailure) {
      dispatch(updateToastState({ type: 'error', message: propsState.LeagueDetailDataFailure.message }))
    }
    return () => {
      dispatch(fetchLeagueDetailsActionFailure(null))
    }
  }, [propsState.LeagueDetailDataFailure])
  const getLeagueData = (leagueId: string) => {
    dispatch(fetchLeagueDetailsAction({ league_id: leagueId }))
  }
  const handleConfiguration = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSaveRule = () => {
    const requestBody = getUpdateRulesRequestBody(updatedRulesData, leagueId)
    if (!requestBody) {
      dispatch(updateToastState({ type: 'error', message: 'Rules Details are missing, please try again' }))
    } else {
      dispatch(updateRules(requestBody))
    }
  }
  const handleRulesUpdate = (rulesUpdatedData: RulesDataInterface[] | null) => {
    setUpdatedRulesData(rulesUpdatedData)
  }
  useEffect(() => {
    if (propsState.updateRulesSuccess) {
      setOpen(false)
      dispatch(updateToastState({ type: 'success', message: propsState.updateRulesSuccess.message }))
    }
  }, [propsState.updateRulesSuccess])
  useEffect(() => {
    if (propsState.updateRulesFailure) {
      dispatch(updateToastState({ type: 'error', message: propsState.updateRulesFailure }))
    }
  }, [propsState.updateRulesFailure])
  const handleTabsChange = (tabsValue: string) => {
    setTabsValue(tabsValue)
  }
  return (
    <>
      <div>
        <Grid container direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Grid item md={9}>
            <Typography variant='h4' component={'h2'}>
              {leagueName}
            </Typography>
          </Grid>
          <Grid item md={1}>
            <div>
              <b>Code: {propsState.leagueDetailData ? propsState.leagueDetailData.code : ''}</b>
            </div>
          </Grid>
          <Grid item md={2}>
            <FantasyButtons
              buttonType='contained'
              label={'Rules'}
              onClick={handleConfiguration}
              id='configurations'
            ></FantasyButtons>
          </Grid>
        </Grid>
      </div>
      <Grid container direction={'row'} spacing='2'>
        <FantasyTabs
          tabsData={LEAGUE_DETAILS_TABS_DATA}
          onChange={handleTabsChange}
          value={tabsValue ? tabsValue : ''}
          flow={CREATE_TEAM_FLOW.ALL_PLAYERS}
        />
        {tabsValue === 'leagueHome' ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{
              margin: '1%',
              padding: '0.5%',
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            {propsState.leagueDetailData && <LeaguePlayers leagueData={propsState.leagueDetailData} />}
          </Grid>
        ) : (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{
              margin: '1%',
              padding: '0.5%',
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            <LeagueLeaderBoard leagueId={leagueId} />
          </Grid>
        )}
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                League Rules
              </Typography>
              {!checkLeagueOwnerOrNot(propsState.leagueDetailData?.owner) && (
                <Button autoFocus color='inherit' onClick={handleSaveRule}>
                  save
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <LeagueRules
            leagueId={leagueId}
            handleRulesUpdate={handleRulesUpdate}
            leagueOwner={propsState.leagueDetailData?.owner}
          />
        </Dialog>
      </Grid>
    </>
  )
}

export default LeagueDetails
