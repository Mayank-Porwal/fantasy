import { Grid, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { LeagueDetailsInterface } from '../../types'
import { tokens } from '../../../../utils/theme'
import { getManageLeaguesDetailsColumns } from './columns'
import FantasyDataGrid from '../../../../component/DataGrid'
import { getGridActions } from './helper'
interface Props {
  leagueData: LeagueDetailsInterface | null
}
const LeaguePlayers = (props: Props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const handleClickActions = () => {}
  const [columns, setColumns] = useState(getManageLeaguesDetailsColumns(handleClickActions))
  const handleCellActions = () => {}
  const handleGridCallback = () => {}
  return (
    <div style={{ width: '100%' }}>
      <FantasyDataGrid
        columns={columns}
        data={props.leagueData ? props.leagueData.league_players : []}
        pagination={true}
        onCallback={handleGridCallback}
        gridActions={getGridActions(handleCellActions)}
        pageCount={props.leagueData ? Math.ceil(props.leagueData.league_players.length / 20) : 0}
        rowCount={props.leagueData ? props.leagueData.league_players.length : 0}
      />
    </div>
  )
}

export default LeaguePlayers
