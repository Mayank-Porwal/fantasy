import { Grid } from '@mui/material'
import React from 'react'
import { FetchLeagueResponseInterface } from '../../types'
interface Props {
  leagueData: FetchLeagueResponseInterface | null
}
const LeaguePlayers = (props: Props) => {
  return <Grid>Hello</Grid>
}

export default LeaguePlayers
