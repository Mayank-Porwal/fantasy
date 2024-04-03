import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { memo, useEffect } from 'react'
import { STATS_COLUMNS } from './constants'
import { PLAYERS_INTERFACE, PlayerStatsDataInterface } from '../types'
import img from '../../../static/images/account-icon.png'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../utils/store/rootReducer'
import { fetchPlayerStats, fetchPlayerStatsSuccess } from '../actions'
import { updateLoaderState } from '../../../utils/appActions/actions'
interface Props {
  selectedPlayer: PLAYERS_INTERFACE | null
  closeStats: any
}
const PlayersStats = (props: Props) => {
  const dispatch = useDispatch()
  const propsState = useSelector((state: RootState) => {
    return {
      playerStats: state.createTeamReducer.playerStats,
      playerStatsFailure: state.createTeamReducer.playerStatsFailure,
    }
  })
  useEffect(() => {
    if (props.selectedPlayer) {
      dispatch(updateLoaderState(true))
      dispatch(fetchPlayerStats({ player_id: props.selectedPlayer.id, n: 5 }))
    }
    return () => {
      dispatch(fetchPlayerStatsSuccess(null))
    }
  }, [props.selectedPlayer])
  useEffect(() => {
    if (propsState.playerStatsFailure || propsState.playerStats) {
      dispatch(updateLoaderState(false))
    }
  }, [propsState.playerStatsFailure, propsState.playerStats])
  return (
    <Card sx={{ width: '100%', margin: '1% 0% 1% 4%' }}>
      <CardHeader
        sx={{ width: '100%', padding: '1% 3%' }}
        action={
          <IconButton aria-label='settings' onClick={props.closeStats}>
            <CloseIcon />
          </IconButton>
        }
        title={props.selectedPlayer?.name}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component='img'
          sx={{ margin: '1%', width: 85, color: 'white' }}
          image={props.selectedPlayer ? (props.selectedPlayer.img ? props.selectedPlayer.img : img) : null}
          alt={props.selectedPlayer ? (props.selectedPlayer.img ? props.selectedPlayer.img : img) : null}
        />
        <CardContent sx={{ width: '100%' }}>
          <Grid direction='row' container>
            <TableContainer component={Paper}>
              <Table aria-label='collapsible table'>
                <TableHead>
                  <TableRow>
                    {STATS_COLUMNS.map((column) => {
                      return (
                        <TableCell sx={{ textAlign: 'center' }} key={column.id}>
                          {column.name}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
                {propsState.playerStats &&
                Array.isArray(propsState.playerStats) &&
                propsState.playerStats.length > 0 ? (
                  <TableBody>
                    {propsState.playerStats &&
                      propsState.playerStats.map((row, index) => <Row key={index} row={row} />)}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Stack
                          sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          spacing={2}
                        >
                          No Record to display !
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Grid>
        </CardContent>
      </div>
    </Card>
  )
}
function Row(props: { key: number; row: PlayerStatsDataInterface }) {
  const { row } = props
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {STATS_COLUMNS.map((stats) => {
          const column: string = stats.id
          const value = row[column as keyof PlayerStatsDataInterface]
          return (
            <TableCell key={stats.id} component='th' scope='row' sx={{ textAlign: 'center' }}>
              {value}
            </TableCell>
          )
        })}
      </TableRow>
    </React.Fragment>
  )
}
export default memo(PlayersStats)
