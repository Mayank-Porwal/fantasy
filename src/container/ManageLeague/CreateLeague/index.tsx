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
import { fromValidation, getCreateLeagueRequestBody, updateUsersTeamsOptions } from './helper'
import { RootState } from '../../../utils/store/rootReducer'
import { UsersTeamsInterface } from '../../../utils/appActions/types'
import { useNavigate } from 'react-router-dom'

const CreateLeague = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const propsState = useSelector((state: RootState) => {
    return {
      createLeagueSuccess: state.leagueReducer.createLeagueSuccess,
      createLeagueFailure: state.leagueReducer.createLeagueFailure,
    }
  })
  const [leagueFormData, setLeagueFormData] = useState<{
    leagueName: string
    selectedTeam: string
    leagueType: boolean
  }>({ leagueName: '', selectedTeam: '', leagueType: false })

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
      navigate('/teams')
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
          <FantasyTextField
            id='selectedTeam'
            label='Team Name'
            onChange={handleFormChange}
            value={leagueFormData.selectedTeam}
            required={true}
            placeholder='Enter Your Team Name'
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
            disabled={fromValidation(leagueFormData)}
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
