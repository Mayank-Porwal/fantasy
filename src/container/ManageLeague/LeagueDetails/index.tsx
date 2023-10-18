import { Grid, Typography } from '@mui/material'
import LeaguePlayers from './LeaguePlayers'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeagueDetailsAction, fetchLeagueDetailsActionFailure } from '../actions'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../../utils/store/rootReducer'
import { updateToastState } from '../../../utils/appActions/actions'
interface Props {
  [name: string]: any
}
const LeagueDetails = (props: Props) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const propsState = useSelector((state: RootState) => {
    return {
      leagueDetailData: state.leagueReducer.leagueDetails,
      LeagueDetailDataFailure: state.leagueReducer.leagueDetailsFailure,
    }
  })
  const [leagueName, setLeagueName] = useState<string>('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const id = urlParams.get('league')
    const name = urlParams.get('leagueName')
    if (id) {
      getLeagueData(id.toString())
    } else {
      navigate('/manage-league')
    }
    if (name) {
      setLeagueName(name)
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
  return (
    <>
      <div>
        <Typography variant='h1' component={'h2'}>
          {leagueName}
        </Typography>
      </div>
      <Grid container direction={'row'} spacing='2'>
        <Grid item xs={12} sm={12} md={6}>
          {/* <LeaguePlayers leagueData={propsState.leagueDetailData} /> */}
        </Grid>
      </Grid>
    </>
  )
}

export default LeagueDetails
