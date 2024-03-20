export interface RulesDataInterface {
  id: number
  rule: string
  type: string
  value: string | number
  is_active: boolean
}
export interface UpdateRulesRequestBodyInterface {
  league_id: number
  rule_data: RulesDataInterface[]
}

export interface CompletedMatchesDataInterface {
  match: string
  match_id: number
  number: number
}

export interface MatchLeaderBoardRequestInterface {
  match_id: number | string
  league_id: number | string
}

export interface MatchLeaderBoardInterface {
  team_id: number
  team_name: string
  owner: string
  trades: number
  total_points: number
  rank: number
  user_id: number
  data: MatchLeaderBoardPlayersInterface[]
}

export interface MatchLeaderBoardPlayersInterface {
  id: number
  name: string
  points: number
}
