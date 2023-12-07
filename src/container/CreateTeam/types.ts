export interface PLAYERS_INTERFACE {
  cap: number
  category: string
  id: number
  img: any
  name: string
  team: string
  team_img: string
}

export interface CreateTeamInterface {
  team_id: number
  //team_name: string
  players: CreateTeamPlayers[]
  substitutions: number
}

export interface CreateTeamPlayers {
  id: number
  captain: boolean
  vice_captain: boolean
}

export interface CaptainInterface {
  captains: { name: string; id: number } | null
  viceCaptains: { name: string; id: number } | null
}

export interface TeamDetailsInterface {
  id: number
  name: string
  substitutions: number
  points: number
  rank: number
  draft_team: TeamInterface[]
  last_submitted_team: TeamInterface[]
}

export interface TeamInterface {
  id: number
  name: string
  team: string
  category: string
  cap: number
  img: string
  captain: boolean
  vice_captain: boolean
  team_img: string
}

export interface StatsInterface {
  runs_scored: number
  balls_faced: number
  strike_rate: number
  wickets: number
  economy: number
  total_overs_bowled: number
  runs_conceded: number
  catches: number
  stumping: number
  run_outs: number
}
