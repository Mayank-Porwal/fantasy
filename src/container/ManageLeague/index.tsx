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
import { Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeagueAction, joinLeagueActionSuccess } from './actions'
import { LeagueResponseDataInterface } from './types'
import { useNavigate } from 'react-router-dom'
const ManageLeague = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [leagueTableData, setLeagueTableData] = useState<LeagueResponseDataInterface[] | []>([])
  const propsState = useSelector((state: RootState) => {
    return {
      popupData: state.appReducer.popUpData,
      leagueData: state.leagueReducer.leagueData,
      leagueDataFailure: state.leagueReducer.leagueDataFailure,
    }
  })
  useEffect(() => {
    const requestBody = getLeaguesRequestBody(null, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE)
    dispatch(fetchLeagueAction(requestBody))
  }, [])
  const [tabsValue, setTabsValue] = useState(LEAGUE_TABS_DATA[0].id)
  var handleClickActions = (link: string, data: any) => {
    navigate(link, { state: data })
  }
  const [columns, setColumns] = useState(getManageLeagueColumns(handleClickActions))
  const handleTabsChange = (tabsValue: string) => {
    setTabsValue(tabsValue)
  }
  const handleLeagueActionsOnClick = (id: string) => {
    if (id === LEAGUE_ACTIONS_ID.CREATE_LEAGUE) {
      dispatch(updatePopupState({ open: true, size: 'sm', content: <CreateLeague />, title: 'Create League' }))
    } else {
      dispatch(updatePopupState({ open: true, size: 'sm', content: <JoinLeague />, title: 'Join League' }))
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
