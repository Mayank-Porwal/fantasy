import { Divider, FormControl, Grid, useTheme } from '@mui/material'
import FantasyTextField from '../../../component/FormElements/TextFlied'
import FantasyDropdowns from '../../../component/FormElements/FantasyDropdowns'
import { useEffect, useState } from 'react'
import FantasySwitch from '../../../component/FormElements/FantasySwitch'
import { tokens } from '../../../utils/theme'
import FantasyButtons from '../../../component/FormElements/Buttons'
import { ButtonTypes } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTeams, updatePopupState, updateToastState } from '../../../utils/appActions/actions'
import { createLeagueAction, createLeagueActionFailure, createLeagueActionSuccess } from '../actions'
import { getCreateLeagueRequestBody, updateUsersTeamsOptions } from './helper'
import { RootState } from '../../../utils/store/rootReducer'
import { UsersTeamsInterface } from '../../../utils/appActions/types'

const CreateLeague = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const propsState = useSelector((state: RootState) => {
    return {
      createLeagueSuccess: state.leagueReducer.createLeagueSuccess,
      createLeagueFailure: state.leagueReducer.createLeagueFailure,
      usersTeams: state.appReducer.usersTeams,
      usersTeamsFailure: state.appReducer.usersTeamsFailure,
    }
  })
  const [leagueFormData, setLeagueFormData] = useState<{
    leagueName: string
    selectedTeam: string
    leagueType: boolean
  }>({ leagueName: '', selectedTeam: '', leagueType: false })
  const [userTeamList, setUserTeamList] = useState<
    | {
        id: string
        name: string
      }[]
    | []
  >([])
  useEffect(() => {
    fetchUsersTeams()
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
  const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, checked: boolean) => {
    const fromData = { ...leagueFormData }
    setLeagueFormData({
      ...fromData,
      [event.target.name]: event.target.value,
    })
  }
  const handleSwitchChange = () => {
    const formData = { ...leagueFormData }
    setLeagueFormData({
      ...formData,
      leagueType: !formData.leagueType,
    })
    console.log({
      ...formData,
      leagueType: !formData.leagueType,
    })
  }
  const handleAction = (id: string) => {
    if (id === 'cancel') {
      dispatch(updatePopupState({ open: false, size: 'sm', content: '', title: '' }))
    } else {
      const requestBody = getCreateLeagueRequestBody(leagueFormData)
      dispatch(createLeagueAction(requestBody))
    }
  }
  useEffect(() => {
    if (propsState.createLeagueSuccess) {
      dispatch(updateToastState({ message: propsState.createLeagueSuccess.message, type: 'success' }))
      dispatch(updatePopupState({ content: null, open: false, size: 'sm', title: '' }))
    }
    return () => {
      dispatch(createLeagueActionSuccess(null))
    }
  }, [propsState.createLeagueSuccess])
  useEffect(() => {
    if (propsState.createLeagueFailure) {
      dispatch(updateToastState({ message: propsState.createLeagueFailure.message, type: 'error' }))
    }
    return () => {
      dispatch(createLeagueActionFailure(null))
    }
  }, [propsState.createLeagueFailure])
  return (
    <>
      <Grid
        container
        direction={'row'}
        spacing={2}
        alignItems={'center'}
        justifyContent={'flex-start'}
        sx={{ padding: '2%' }}
      >
        <Grid item xs={12}>
          <FantasyTextField
            id='leagueName'
            label='Name'
            onChange={handleFormChange}
            required
            value={leagueFormData.leagueName}
          />
        </Grid>
        <Grid item xs={12}>
          <FantasyDropdowns
            options={userTeamList ? userTeamList : []}
            id='selectedTeam'
            label='Select Team'
            onChange={handleFormChange}
            value={leagueFormData.selectedTeam}
            required={false}
            placeholder='Select Your Team'
          />
        </Grid>
        <Grid item xs={12}>
          <FantasySwitch
            id='leagueType'
            name='leagueType'
            value={leagueFormData.leagueType}
            label={'Private'}
            onChange={handleSwitchChange}
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
            label='Save'
            onClick={() => handleAction('save')}
            buttonType={ButtonTypes.CONTAINED}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default CreateLeague
