export interface CreateLeaguePayloadInterface {
  leagueData: { league_name: string; type: string; team_name: string }
}

export interface JoinLeaguePayloadInterface {
  team_name: string
  code: string
}

export interface FetchLeaguePayloadInterface {
  page: number
  size: number
  filter_data: FilterDataInterface[] | null
}

export interface FilterDataInterface {
  field: string
  operator: string
  value: string | boolean | null
}

export interface FetchLeagueResponseInterface {
  total: number
  total_pages: string
  page: number
  size: number
  data: LeagueResponseDataInterface[]
}

export interface LeagueResponseDataInterface {
  league_id: number
  active: boolean
  league_name: string
  type: string
  team_name: string
  team_id: number
  rank: number
  owner: boolean
  remaining_subs: number
  points: number
}

export interface FetchLeagueDetailsPayloadInterface {
  league_id: string
}

export interface LeagueDetailsInterface {
  owner: number
  league_id: number
  league_name: string
  league_players: LeaguePlayersInterface[]
  code: string
}

export interface LeaguePlayersInterface {
  points: number
  rank: number
  remaining_subs: number
  team_id: number
  team_name: string
  team_owner: string
}

export interface PublicLeagueResponseInterface {
  page: number
  size: number
  total: number
  total_pages: number
  data: PublicLeagueDataInterface[] | []
}

export interface PublicLeagueDataInterface {
  active: boolean
  league_id: number
  league_name: string
  owner_id: number
  owner_first_name: string
  owner_last_name: string
  type: string
}
