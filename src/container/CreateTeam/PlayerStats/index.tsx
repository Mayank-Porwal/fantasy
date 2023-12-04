import { Card, CardContent, CardMedia, Grid } from '@mui/material'
import React, { memo } from 'react'
import { STATS_COLUMNS, TEMP_DATA } from './constants'
import { PLAYERS_INTERFACE, StatsInterface } from '../types'
import img from '../../../static/images/account-icon.png'
import CloseIcon from '@mui/icons-material/Close'
interface Props {
  selectedPlayer: PLAYERS_INTERFACE | null
  closeStats: any
}
const PlayersStats = (props: Props) => {
  return (
    <Card sx={{ display: 'flex', width: '100%', height: '200px' }}>
      <CardMedia
        component='img'
        sx={{ margin: '4%', width: 85, height: 100, color: 'white' }}
        image={props.selectedPlayer ? (props.selectedPlayer.img ? props.selectedPlayer.img : img) : null}
        alt={props.selectedPlayer ? (props.selectedPlayer.img ? props.selectedPlayer.img : img) : null}
      />
      <CardContent sx={{ width: '100%' }}>
        <Grid direction='row' container>
          {STATS_COLUMNS.map((columns) => {
            return (
              <Grid
                sx={{ padding: '1%', whiteSpace: 'nowrap' }}
                item
                xs={columns.id === 'runs_conceded' ? 2 : 1}
                key={columns.id}
              >
                {columns.name}
              </Grid>
            )
          })}
          <Grid style={{ cursor: 'pointer' }} item onClick={props.closeStats}>
            <CloseIcon />
          </Grid>
        </Grid>
        {/* <div style={{ padding: '1%', cursor: 'pointer' }} onClick={props.closeStats}></div> */}
        <div>
          {' '}
          {TEMP_DATA.map((data: StatsInterface, index: number) => {
            return (
              <Grid key={index} direction='row' container>
                {STATS_COLUMNS.map((columns) => {
                  const column: string = columns.id
                  const value = data[column as keyof StatsInterface]
                  return (
                    <Grid
                      sx={{ padding: '1%', whiteSpace: 'nowrap' }}
                      item
                      xs={columns.id === 'runs_conceded' ? 2 : 1}
                      key={columns.id}
                    >
                      {value}
                    </Grid>
                  )
                })}
              </Grid>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
// runs scored, balls faced, SR,wickets taken, Economy, overs bowled,runs conceded, catches, stumpings, run-outs
export default memo(PlayersStats)
