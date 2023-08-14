import { Divider, Grid, useTheme } from '@mui/material'
import FantasyTextField from '../../../component/FormElements/TextFlied'
import { useEffect, useState } from 'react'
import FantasyButtons from '../../../component/FormElements/Buttons'
import { ButtonTypes } from '../../../utils/constants'
import { tokens } from '../../../utils/theme'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTeams, updateLoaderState, updatePopupState, updateToastState } from '../../../utils/appActions/actions'
import { getJoinLeagueRequestBody } from './helper'
import FantasyDropdowns from '../../../component/FormElements/FantasyDropdowns'
import { RootState } from '../../../utils/store/rootReducer'
import { joinLeagueAction, joinLeagueActionFailure, joinLeagueActionSuccess } from '../actions'
import { updateUsersTeamsOptions } from '../CreateLeague/helper'

const JoinLeague = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const propsState = useSelector((state: RootState) => {
    return {
      joinLeagueSuccess: state.leagueReducer.joinLeagueSuccess,
      joinLeagueFailure: state.leagueReducer.joinLeagueFailure,
      usersTeams: state.appReducer.usersTeams,
      usersTeamsFailure: state.appReducer.usersTeamsFailure,
    }
  })
  const [formData, setFormData] = useState({ code: '', selectedTeam: '' })
  const [userTeamList, setUserTeamList] = useState<
    | {
        id: string
        name: string
      }[]
    | []
  >([])
  useEffect(() => {
    if (!propsState.usersTeams) {
      fetchUsersTeams()
    }
  }, [])
  const fetchUsersTeams = () => {
    dispatch(getAllTeams())
  }
  useEffect(() => {
    if (propsState.usersTeams) {
      const updatedOptions = updateUsersTeamsOptions(propsState.usersTeams)
      setUserTeamList(updatedOptions)
    }
  }, [propsState.usersTeams])
  const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handleAction = (id: string) => {
    console.log(id)
    if (id === 'cancel') {
      dispatch(updatePopupState({ open: false, size: 'sm', content: '', title: '' }))
    } else {
      dispatch(updateLoaderState(true))
      const requestBody = getJoinLeagueRequestBody(formData)
      dispatch(joinLeagueAction(requestBody))
    }
  }
  useEffect(() => {
    if (propsState.joinLeagueSuccess) {
      dispatch(updateToastState({ type: 'success', message: propsState.joinLeagueSuccess.message }))
      dispatch(updatePopupState({ open: false, size: 'sm', content: '', title: '' }))
      dispatch(updateLoaderState(false))
    }
    return () => {
      dispatch(joinLeagueActionSuccess(null))
    }
  }, [propsState.joinLeagueSuccess])
  useEffect(() => {
    if (propsState.joinLeagueFailure) {
      dispatch(updateLoaderState(false))
      dispatch(updateToastState({ type: 'error', message: propsState.joinLeagueFailure.message }))
      return () => {
        dispatch(joinLeagueActionFailure(null))
      }
    }
  }, [propsState.joinLeagueFailure])
  return (
    <Grid>
      <Grid
        container
        spacing={2}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        sx={{ padding: '2%' }}
      >
        <Grid xs={12} item>
          <FantasyTextField
            placeholder='Enter League Code'
            id='code'
            label='League Code'
            onChange={handleFormChange}
            required
            value={formData.code}
          />
        </Grid>
        <Grid xs={12} item>
          <FantasyDropdowns
            options={userTeamList ? userTeamList : []}
            id='selectedTeam'
            label='Select Team'
            onChange={handleFormChange}
            value={formData.selectedTeam}
            required={false}
            placeholder='Select Your Team'
          />
        </Grid>
      </Grid>
      <div>
        <Divider
          sx={{ width: '100%', boxShadow: '0px 15px 10px -15px #111', border: `1px solid ${colors.greenAccent[500]}` }}
        />
      </div>
      <Grid
        container
        spacing={2}
        direction='row'
        alignItems={'center'}
        justifyContent={'flex-end'}
        sx={{ padding: '2%' }}
      >
        <Grid item xs={3}>
          <FantasyButtons
            id='cancel'
            label='Cancel'
            onClick={() => handleAction('cancel')}
            buttonType={ButtonTypes.OUTLINED}
          />
        </Grid>
        <Grid item xs={3}>
          <FantasyButtons
            id='save'
            label='Join'
            onClick={() => handleAction('save')}
            buttonType={ButtonTypes.CONTAINED}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default JoinLeague
