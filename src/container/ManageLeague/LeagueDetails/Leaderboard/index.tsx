import {
  Alert,
  Box,
  Collapse,
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
  Typography,
  useTheme,
} from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import FantasyDropdowns from '../../../../component/FormElements/FantasyDropdowns'
import { useDispatch, useSelector } from 'react-redux'
import {
  completedMatchesAction,
  getLeaderBoardAction,
  getLeaderBoardFailureAction,
  getLeaderBoardSuccessAction,
} from '../actions'
import { RootState } from '../../../../utils/store/rootReducer'
import { getColorBasedOnPoints, getCompletedMatchesOptions, getUpdatedLeaderBoardByOwner } from './helper'
import { tokens } from '../../../../utils/theme'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { MatchLeaderBoardInterface, MatchLeaderBoardPlayersInterface } from '../types'
import { updateLoaderState, updateToastState } from '../../../../utils/appActions/actions'
interface Props {
  leagueId: string | null
}
const LeagueLeaderBoard = (props: Props) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const propsState = useSelector((state: RootState) => {
    return {
      completedMatches: state.leagueDetailsReducer.completedMatches,
      leaderBoard: state.leagueDetailsReducer.leaderBoard,
      leaderBoardFailure: state.leagueDetailsReducer.leaderBoardFailure,
    }
  })
  const [leaderBoardData, setLeaderBoardData] = useState<MatchLeaderBoardInterface[] | null>(null)
  const [selectedMatch, setSelectedMatch] = useState('')
  const matchesOptions = useMemo(() => {
    if (propsState.completedMatches) {
      const options = getCompletedMatchesOptions(propsState.completedMatches)
      if (options.length > 0) {
        setSelectedMatch(options[0].id.toString())
      }
      return options
    } else {
      return []
    }
  }, [propsState.completedMatches])
  useEffect(() => {
    dispatch(completedMatchesAction())
  }, [])

  const handleMatchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSelectedMatch(event.target.value)
  }
  useEffect(() => {
    if (selectedMatch) {
      dispatch(updateLoaderState(true))
      dispatch(
        getLeaderBoardAction({
          match_id: parseInt(selectedMatch),
          league_id: parseInt(props.leagueId ? props.leagueId : ''),
        }),
      )
    }
  }, [selectedMatch])
  useEffect(() => {
    if (propsState.leaderBoard) {
      const updatedLeaderBoard = getUpdatedLeaderBoardByOwner(propsState.leaderBoard)
      setLeaderBoardData(updatedLeaderBoard)
      dispatch(updateLoaderState(false))
    }
    return () => {
      dispatch(getLeaderBoardSuccessAction(null))
    }
  }, [propsState.leaderBoard])

  useEffect(() => {
    if (propsState.leaderBoardFailure) {
      dispatch(updateLoaderState(false))
      dispatch(updateToastState({ message: propsState.leaderBoardFailure.message, type: 'error' }))
    }
    return () => {
      dispatch(getLeaderBoardFailureAction(null))
    }
  }, [propsState.leaderBoardFailure])

  return (
    <>
      <Grid container direction='row-reverse'>
        <Grid item xs={12} md={4}>
          <FantasyDropdowns
            options={matchesOptions}
            required
            placeholder={'Select Match'}
            id={'match'}
            label={'Match'}
            value={selectedMatch}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleMatchChange(event)}
          />
        </Grid>
      </Grid>
      <Grid container direction='row' sx={{ marginTop: '2%' }}>
        <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Rank</TableCell>
                <TableCell align='left'>Team Name</TableCell>
                <TableCell align='left'>Owner</TableCell>
                <TableCell align='left'>Points</TableCell>
                <TableCell align='center'>Trades</TableCell>
              </TableRow>
            </TableHead>
            {leaderBoardData && Array.isArray(leaderBoardData) && leaderBoardData.length > 0 ? (
              <TableBody>
                {leaderBoardData &&
                  leaderBoardData.map((row: MatchLeaderBoardInterface) => <Row key={row.team_id} row={row} />)}
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
    </>
  )
}
function Row(props: { key: number; row: MatchLeaderBoardInterface }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { row } = props
  const [open, setOpen] = React.useState(false)
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.rank}
        </TableCell>
        <TableCell align='left'>{row.team_name}</TableCell>
        <TableCell align='left'>{row.owner}</TableCell>
        <TableCell align='left'>{row.total_points}</TableCell>
        <TableCell align='center'>{row.trades}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <TableHead>
                <TableRow>
                  {row.data.map((playerName) => {
                    return (
                      <TableCell sx={{ color: colors.greenAccent[400] }} key={`${playerName.id}`}>
                        {playerName.name}
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {row.data.map((playerName, index) => {
                    return (
                      <TableCell align='left' component={'th'} key={`${playerName.id}-${index}`}>
                        {playerName.points}
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableBody>
              {/* {row.data.map((playerData: MatchLeaderBoardPlayersInterface) => {
                  return (
                    <Grid item key={playerData.id} xs={3} sx={{ color: getColorBasedOnPoints(playerData.points) }}>
                      {`${playerData.name}: ${playerData.points}`}
                    </Grid>
                  )
                })} */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
export default memo(LeagueLeaderBoard)
