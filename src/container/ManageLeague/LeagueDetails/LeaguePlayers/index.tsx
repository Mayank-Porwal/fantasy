import { Dialog, DialogContent, DialogTitle, IconButton, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { LeagueDetailsInterface, LeaguePlayersInterface } from '../../types'
import { tokens } from '../../../../utils/theme'
import { getManageLeaguesDetailsColumns } from './columns'
import FantasyDataGrid from '../../../../component/DataGrid'
import CloseIcon from '@mui/icons-material/Close'
import LeagueMatchup from '../LeagueMatchup'
import { TeamDetailsInterface } from '../../../CreateTeam/types'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
interface Props {
  leagueData: LeagueDetailsInterface | null
}
const LeaguePlayers = (props: Props) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [matchUpSelectedTeam, setMatchUpSelectedTeam] = useState<LeaguePlayersInterface | null>(null)
  const handleClickActions = (rowData: LeaguePlayersInterface) => {
    setMatchUpSelectedTeam(rowData)
    setOpen(true)
  }
  const [columns, setColumns] = useState(getManageLeaguesDetailsColumns(handleClickActions))
  const handleCellActions = () => {}
  const handleGridCallback = () => {}
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div style={{ width: '100%' }}>
      <FantasyDataGrid
        columns={columns}
        data={props.leagueData ? props.leagueData.league_players : []}
        pagination={true}
        onCallback={handleGridCallback}
        //gridActions={getGridActions(handleCellActions)}
        pageCount={props.leagueData ? Math.ceil(props.leagueData.league_players.length / 20) : 0}
        rowCount={props.leagueData ? props.leagueData.league_players.length : 0}
      />
      <Dialog
        fullWidth={true}
        maxWidth='xl'
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Matchup
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <LeagueMatchup
            selectedTeam={matchUpSelectedTeam}
            leagueId={props.leagueData ? props.leagueData.league_id : null}
            leagueData={props.leagueData && props.leagueData.league_players ? props.leagueData.league_players : null}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LeaguePlayers
