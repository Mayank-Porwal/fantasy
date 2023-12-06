import FantasyTabs from '../../component/FantasyTabs'
import { LEAGUE_ACTIONS_ID, LEAGUE_TABS_DATA } from './constants'
import { useEffect, useState } from 'react'
import { CREATE_TEAM_FLOW } from '../CreateTeam/constants'
import FantasyButtons from '../../component/FormElements/Buttons'
import { ButtonTypes, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../utils/constants'
import { RootState } from '../../utils/store/rootReducer'
import { updatePopupState } from '../../utils/appActions/actions'
import CreateLeague from './CreateLeague'
import JoinLeague from './JoinLeague'
import MUIDataTable from 'mui-datatables'
import { getGridActions, getLeaguesRequestBody, getManageLeagueColumns, getTableTitle } from './helper'
import FantasyDataGrid from '../../component/DataGrid'
import { Grid, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeagueAction, fetchLeagueActionSuccess, fetchPublicLeagues, joinLeagueActionSuccess } from './actions'
import { LeagueResponseDataInterface, PublicLeagueDataInterface } from './types'
import { useLocation, useNavigate } from 'react-router-dom'
import { getPublicLeaguesColumns } from './columns'
import { tokens } from '../../utils/theme'
const ManageLeague = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [leagueTableData, setLeagueTableData] = useState<
    LeagueResponseDataInterface[] | PublicLeagueDataInterface[] | []
  >([])
  const propsState = useSelector((state: RootState) => {
    return {
      popupData: state.appReducer.popUpData,
      leagueData: state.leagueReducer.leagueData,
      leagueDataFailure: state.leagueReducer.leagueDataFailure,
      publicLeaguesData: state.leagueReducer.publicLeagues,
      publicLeaguesDataFailure: state.leagueReducer.publicLeaguesFailure,
    }
  })
  const [tabsValue, setTabsValue] = useState('myLeague')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const leagueType = urlParams.get('type')
    const requestBody = getLeaguesRequestBody(null, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE)
    if (leagueType === 'all-leagues') {
      setTabsValue(LEAGUE_TABS_DATA[1].id)
      dispatch(fetchPublicLeagues(requestBody))
      setColumns(getPublicLeaguesColumns(handlePublicLeagueActions, colors))
    } else {
      setTabsValue(LEAGUE_TABS_DATA[0].id)
      dispatch(fetchLeagueAction(requestBody))
      setColumns(getManageLeagueColumns(handleClickActions))
    }
  }, [])
  var handleClickActions = (link: string, data: any) => {
    navigate(link, { state: data })
  }
  var handlePublicLeagueActions = (row: any) => {
    dispatch(
      updatePopupState({
        open: true,
        size: 'sm',
        content: <JoinLeague flow='public' selectedRow={row} />,
        title: 'Join League',
      }),
    )
  }
  const [columns, setColumns] = useState(getManageLeagueColumns(handleClickActions))
  const handleTabsChange = (tabsValue: string) => {
    const requestBody = getLeaguesRequestBody(null, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE)
    navigate(`../manage-league?type=${tabsValue === 'public' ? 'all-leagues' : 'my-leagues'}`, { replace: true })
    if (tabsValue === LEAGUE_TABS_DATA[0].id) {
      dispatch(fetchLeagueAction(requestBody))
      setTabsValue(LEAGUE_TABS_DATA[0].id)
      setColumns(getManageLeagueColumns(handleClickActions))
    } else {
      setTabsValue(LEAGUE_TABS_DATA[1].id)
      dispatch(fetchPublicLeagues(requestBody))
      setColumns(getPublicLeaguesColumns(handlePublicLeagueActions, colors))
    }
  }
  const handleLeagueActionsOnClick = (id: string) => {
    if (id === LEAGUE_ACTIONS_ID.CREATE_LEAGUE) {
      dispatch(updatePopupState({ open: true, size: 'sm', content: <CreateLeague />, title: 'Create League' }))
    } else {
      dispatch(
        updatePopupState({ open: true, size: 'sm', content: <JoinLeague flow='private' />, title: 'Join League' }),
      )
    }
  }
  useEffect(() => {
    if (propsState.leagueData) {
      setLeagueTableData(propsState.leagueData.data)
      return () => {
        dispatch(joinLeagueActionSuccess(null))
      }
    }
  }, [propsState.leagueData])
  useEffect(() => {
    if (propsState.publicLeaguesData) {
      setLeagueTableData(propsState.publicLeaguesData.data)
      return () => {
        dispatch(fetchLeagueActionSuccess(null))
      }
    }
  }, [propsState.publicLeaguesData])
  const handleGridCallback = (params: any) => {
    console.log(params)
  }
  const handleCellActions = (id: string) => {}
  return (
    <Grid>
      <Grid container direction='row' sx={{ margin: '2% 0%' }}>
        <Typography variant='h2' sx={{ fontWeight: 'bold' }}>
          Manage Leagues
        </Typography>
      </Grid>
      <Grid
        container
        direction='row'
        spacing={2}
        sx={{ margin: '2% 0%' }}
        alignItems={'center'}
        justifyContent={'flex-end'}
      >
        {tabsValue === LEAGUE_TABS_DATA[0].id && (
          <Grid item xs={6} sm={6} md={3} lg={3} xl={2}>
            <FantasyButtons
              id='joinLeague'
              label='Join League'
              onClick={() => handleLeagueActionsOnClick(LEAGUE_ACTIONS_ID.JOIN_LEAGUE)}
              buttonType={ButtonTypes.OUTLINED}
            />
          </Grid>
        )}
        <Grid item xs={6} sm={6} md={3} lg={3} xl={2}>
          <FantasyButtons
            id='createLeague'
            label='Create League'
            onClick={() => handleLeagueActionsOnClick(LEAGUE_ACTIONS_ID.CREATE_LEAGUE)}
            buttonType={ButtonTypes.CONTAINED}
          />
        </Grid>
      </Grid>
      <Grid container direction='row' sx={{ margin: '2% 0%' }}>
        <FantasyTabs
          tabsData={LEAGUE_TABS_DATA}
          onChange={handleTabsChange}
          value={tabsValue ? tabsValue : ''}
          flow={CREATE_TEAM_FLOW.ALL_PLAYERS}
        />
      </Grid>
      <Grid container direction='row' alignItems='center' justifyContent='center'>
        <div style={{ width: '100%' }}>
          <FantasyDataGrid
            columns={columns}
            data={leagueTableData}
            pagination={true}
            onCallback={handleGridCallback}
            gridActions={getGridActions(handleCellActions)}
            pageCount={propsState.leagueData ? parseInt(propsState.leagueData.total_pages) : 0}
            rowCount={propsState.leagueData ? propsState.leagueData.total : 0}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default ManageLeague
