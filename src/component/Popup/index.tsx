import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePopupState } from '../../utils/appActions/actions'
import { RootState } from '../../utils/store/rootReducer'
import { PopupInterface } from '../../utils/appActions/types'
import { DialogContentText, Divider, Grid, Typography, useTheme } from '@mui/material'
import { getPopupWidth } from './helper'
import { tokens } from '../../utils/theme'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function CustomizedDialogs() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const propsState = useSelector((state: RootState) => {
    return {
      popupData: state.appReducer.popUpData,
    }
  })
  const [popUpData, setPopupData] = useState<PopupInterface | null>(null)
  useEffect(() => {
    if (propsState.popupData) {
      console.log(propsState.popupData)
      setPopupData(propsState.popupData)
    }
  }, [propsState.popupData])
  const handleClose = (event: React.SyntheticEvent, reason: string) => {
    if (reason !== 'backdropClick') {
      dispatch(updatePopupState({ open: false, size: 'md', content: null, title: '' }))
    }
  }

  return (
    <Grid container direction={'row'}>
      <Dialog
        open={popUpData ? popUpData.open : false}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
        fullWidth
        maxWidth={popUpData ? popUpData.size : 'md'}
      >
        <DialogTitle id='responsive-dialog-title'>
          <Typography sx={{ fontWeight: 'bold', fontSize: '24px' }}>{popUpData ? popUpData.title : ''}</Typography>
          <IconButton
            aria-label='close'
            onClick={(event) => handleClose(event, 'close')}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider
          sx={{ width: '100%', boxShadow: '0px 15px 10px -15px #111', border: `1px solid ${colors.greenAccent[500]}` }}
        />
        <DialogContent sx={{ margin: 0, padding: 0 }}>{popUpData ? popUpData.content : null}</DialogContent>
      </Dialog>
    </Grid>
  )
}
