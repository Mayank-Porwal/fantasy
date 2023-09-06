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
  league_id: string
  active: boolean
  league_name: string
  type: string
  team: string
  rank: number
  owner: boolean
}

export interface FetchLeagueDetailsPayloadInterface {
  league_id: string
}

export interface LeagueDetailsInterface {
  rank: string
  team_id: number
  team_name: string
  team_owner: string
  remaining_subs: number
  points: number
}
