import { cloneDeep } from 'lodash'
import { ComparisonFormDataInterface, LeaguePlayersInterface } from '../../types'
import { MATCH_UP_FLOWS } from './constants'
import Cookies from 'js-cookie'
import { TeamDetailsInterface } from '../../../CreateTeam/types'
import { MatchLeaderBoardInterface, MatchLeaderBoardPlayersInterface } from '../types'

export const getUpdatedComparisonData = (comparisonData: ComparisonFormDataInterface, type: string, value: string) => {
  let data = cloneDeep(comparisonData)
  switch (type) {
    case MATCH_UP_FLOWS.MATCH:
      data = { ...data, match: value }
      break
    case MATCH_UP_FLOWS.TEAM_ONE:
      data = { ...data, teamA: value }
      break
    case MATCH_UP_FLOWS.TEAM_TWO:
      data = { ...data, teamB: value }
      break
    default:
      data = { ...data }
  }
  return data
}

export const getComparisonDropdownOptions = (leagueData: LeaguePlayersInterface[] | null) => {
  if (!leagueData) {
    return []
  }

  return leagueData.map((league) => {
    return { id: league.team_id, name: league.team_name }
  })
}

export const getInitialSelectedValueForComparison = (
  leagueData: LeaguePlayersInterface[] | null,
  formData: ComparisonFormDataInterface,
  selectedTeam: LeaguePlayersInterface,
) => {
  if (!leagueData) {
    return formData
  }
  const updatedData = cloneDeep(formData)
  const ownerTeam = leagueData.find((x) => x.team_owner_id.toString() === Cookies.get('id'))
  return {
    ...updatedData,
    teamA: selectedTeam.team_id ? selectedTeam.team_id.toString() : '',
    teamB: ownerTeam ? ownerTeam.team_id.toString() : '',
  }
}

export const getComparisonTeamData = (
  leaderBoard: MatchLeaderBoardInterface[] | null,
  comparisonData: ComparisonFormDataInterface,
) => {
  let updatedData: {
    teamA: MatchLeaderBoardPlayersInterface[]
    teamB: MatchLeaderBoardPlayersInterface[]
    teamATotal: number
    teamBTotal: number
  } = { teamA: [], teamB: [], teamATotal: 0, teamBTotal: 0 }
  if (!leaderBoard) {
    return updatedData
  }
  const findTeamA = leaderBoard.find((x) => x.team_id.toString() === comparisonData.teamA)
  const findTeamB = leaderBoard.find((x) => x.team_id.toString() === comparisonData.teamB)
  updatedData = {
    teamATotal: findTeamA ? findTeamA.total_points : 0,
    teamBTotal: findTeamB ? findTeamB.total_points : 0,
    teamA: findTeamA ? findTeamA.data : [],
    teamB: findTeamB ? findTeamB.data : [],
  }
  return updatedData
}
