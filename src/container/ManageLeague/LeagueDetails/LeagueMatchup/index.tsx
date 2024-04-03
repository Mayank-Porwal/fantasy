import { Card, CardContent, Grid } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import FantasyDropdowns from '../../../../component/FormElements/FantasyDropdowns'
import { MATCH_UP_FLOWS } from './constants'
import {
  getComparisonDropdownOptions,
  getComparisonTeamData,
  getInitialSelectedValueForComparison,
  getUpdatedComparisonData,
} from './helper'
import { useDispatch, useSelector } from 'react-redux'
import { completedMatchesAction, getLeaderBoardAction } from '../actions'
import { RootState } from '../../../../utils/store/rootReducer'
import { getCompletedMatchesOptions } from '../Leaderboard/helper'
import { ComparisonFormDataInterface, LeaguePlayersInterface } from '../../types'
import { cloneDeep } from 'lodash'
import { getTeamByIdAction } from '../../../CreateTeam/actions'
import { updateLoaderState, updateToastState } from '../../../../utils/appActions/actions'
import { TeamDetailsInterface } from '../../../CreateTeam/types'
import { MatchLeaderBoardInterface } from '../types'
interface Props {
  selectedTeam: LeaguePlayersInterface | null
  leagueData: LeaguePlayersInterface[] | null
  leagueId: number | null
}
const LeagueMatchup = (props: Props) => {
  const dispatch = useDispatch()
  const propsState = useSelector((state: RootState) => {
    return {
      completedMatches: state.leagueDetailsReducer.completedMatches,
      teamData: state.createTeamReducer.selectedTeam,
      leaderBoard: state.leagueDetailsReducer.leaderBoard,
      leaderBoardFailure: state.leagueDetailsReducer.leaderBoardFailure,
    }
  })
  const [comparisonData, setComparisonData] = useState<ComparisonFormDataInterface>({
    match: '',
    teamA: '',
    teamB: '',
  })

  const [leaderBoardData, setLeaderBoardData] = useState<MatchLeaderBoardInterface[] | null>(null)
  const updatedMatchupValues = useMemo(
    () => getComparisonTeamData(leaderBoardData, comparisonData),
    [leaderBoardData, comparisonData],
  )
  const matchesOptions = useMemo(() => {
    if (propsState.completedMatches) {
      const options = getCompletedMatchesOptions(propsState.completedMatches)
      if (options.length > 0) {
        setComparisonData((prevState) => {
          return { ...prevState, match: options[0].id.toString() }
        })
      }
      return options
    } else {
      return []
    }
  }, [propsState.completedMatches])
  useEffect(() => {
    if (propsState.leaderBoard) {
      setLeaderBoardData(propsState.leaderBoard)
      dispatch(updateLoaderState(false))
    }
  }, [propsState.leaderBoard])
  useEffect(() => {
    if (propsState.leaderBoardFailure) {
      dispatch(updateToastState({ message: propsState.leaderBoardFailure.message, type: 'error' }))
      dispatch(updateLoaderState(false))
    }
  }, [propsState.leaderBoardFailure])
  useEffect(() => {
    if (comparisonData.match) {
      dispatch(updateLoaderState(true))
      dispatch(
        getLeaderBoardAction({
          match_id: parseInt(comparisonData.match),
          league_id: props.leagueId ? props.leagueId : '',
        }),
      )
    }
  }, [comparisonData.match])
  useEffect(() => {
    if (!propsState.completedMatches) {
      dispatch(completedMatchesAction())
    }
    if (props.selectedTeam) {
      const updatedData = getInitialSelectedValueForComparison(props.leagueData, comparisonData, props.selectedTeam)
      setComparisonData(updatedData)
    }
  }, [])
  const handleMatchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: string) => {
    const updatedData = getUpdatedComparisonData(comparisonData, type, event.target.value.toString())
    setComparisonData(updatedData)
  }
  return (
    <div>
      <Grid container direction='row' spacing={1}>
        <Grid item xs={4}>
          <FantasyDropdowns
            options={matchesOptions}
            required
            placeholder={'Select Match'}
            id={'match'}
            label={'Match'}
            value={comparisonData.match}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleMatchChange(event, MATCH_UP_FLOWS.MATCH)
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FantasyDropdowns
            options={getComparisonDropdownOptions(props.leagueData)}
            required
            placeholder={'Selected Team'}
            id={'selectedTeam'}
            label={'Selected Team'}
            value={comparisonData.teamA}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleMatchChange(event, MATCH_UP_FLOWS.TEAM_ONE)
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FantasyDropdowns
            options={getComparisonDropdownOptions(props.leagueData)}
            required
            placeholder={'Compare With'}
            id={'compareWith'}
            label={'Compare With'}
            value={comparisonData.teamB}
            disabled={true}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              handleMatchChange(event, MATCH_UP_FLOWS.TEAM_TWO)
            }
          />
        </Grid>
      </Grid>
      <Grid container direction='row' justifyContent={'space-around'} alignItems={'center'} sx={{ marginTop: '1%' }}>
        <Grid item>
          <Card>
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    margin: '1%',
                    fontWeight: 'bold',
                    color: updatedMatchupValues.teamATotal > updatedMatchupValues.teamBTotal ? 'green' : '',
                  }}
                >
                  {updatedMatchupValues.teamATotal}
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ margin: '1%', fontWeight: 'bold' }}>Total</div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    margin: '1%',
                    fontWeight: 'bold',
                    color: updatedMatchupValues.teamATotal < updatedMatchupValues.teamBTotal ? 'green' : '',
                  }}
                >
                  {updatedMatchupValues.teamBTotal}
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container direction='row' spacing={2} sx={{ maxHeight: '50%', overflowY: 'auto', padding: '1%' }}>
        <Grid item xs={6}>
          {updatedMatchupValues.teamA.map((team) => {
            return (
              <Card>
                <CardContent>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>{team.name}</div>
                    <div>{team.points}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </Grid>
        <Grid item xs={6}>
          {updatedMatchupValues.teamB.map((team) => {
            return (
              <Card>
                <CardContent>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>{team.name}</div>
                    <div>{team.points}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </Grid>
      </Grid>
    </div>
  )
}

export default memo(LeagueMatchup)
