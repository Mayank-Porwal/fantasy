import { Grid } from '@mui/material'
import React from 'react'
import { LeagueDetailsInterface } from '../../types'
interface Props {
  leagueData: LeagueDetailsInterface | null
}
const LeaguePlayers = (props: Props) => {
  console.log(props.leagueData)
  return (
    <Grid container direction='column'>
      {props.leagueData &&
        props.leagueData.league_players.map((player) => {
          return <>{player.team_name}</>
        })}
    </Grid>
  )
}

export default LeaguePlayers
