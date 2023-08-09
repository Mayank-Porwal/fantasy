import { Divider, Grid, useTheme } from '@mui/material'
import FantasyTextField from '../../../component/FormElements/TextFlied'
import { useState } from 'react'
import FantasyButtons from '../../../component/FormElements/Buttons'
import { ButtonTypes } from '../../../utils/constants'
import { tokens } from '../../../utils/theme'
import { useDispatch } from 'react-redux'
import { updatePopupState } from '../../../utils/appActions/actions'

const JoinLeague = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [formData, setFormData] = useState({ code: '' })
  const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ code: event.target.value })
  }
  const handleAction = (id: string) => {
    console.log(id)
    if (id === 'cancel') {
      dispatch(updatePopupState({ open: false, size: 'sm', content: '', title: '' }))
    }
  }
  return (
    <Grid>
      <Grid container direction={'row'} alignItems={'center'} justifyContent={'flex-start'} sx={{ padding: '2%' }}>
        <FantasyTextField
          placeholder='Enter League Code'
          id='code'
          label='League Code'
          onChange={handleFormChange}
          required
          value={formData.code}
        />
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
            onClick={() => handleAction('cancel')}
            buttonType={ButtonTypes.CONTAINED}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default JoinLeague
