import { Grid, Typography } from '@mui/material'
import FantasyTabs from '../../component/FantasyTabs'
import { LEAGUE_ACTIONS_ID, LEAGUE_TABS_DATA } from './constants'
import { useState } from 'react'
import { CREATE_TEAM_FLOW } from '../CreateTeam/constants'
import FantasyButtons from '../../component/FormElements/Buttons'
import { ButtonTypes } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../utils/store/rootReducer'
import { updatePopupState } from '../../utils/appActions/actions'
import CreateLeague from './CreateLeague'
import JoinLeague from './JoinLeague'
const ManageLeague = () => {
  const dispatch = useDispatch()
  const propsState = useSelector((state: RootState) => {
    return {
      popupData: state.appReducer.popUpData,
    }
  })
  const [tabsValue, setTabsValue] = useState(LEAGUE_TABS_DATA[0].id)
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
          <Grid item xs={2}>
            <FantasyButtons
              id='joinLeague'
              label='Join League'
              onClick={() => handleLeagueActionsOnClick(LEAGUE_ACTIONS_ID.JOIN_LEAGUE)}
              buttonType={ButtonTypes.OUTLINED}
            />
          </Grid>
        )}
        <Grid item xs={2}>
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
    </Grid>
  )
}

export default ManageLeague
