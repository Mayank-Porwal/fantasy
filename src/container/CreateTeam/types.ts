export interface PLAYERS_INTERFACE {
  cap: string
  category: string
  id: number
  img: any
  name: string
  team: string
}

export interface CreateTeamInterface {
  team_name: string
  players: CreateTeamPlayers[]
}

export interface CreateTeamPlayers {
  id: number
  captain: boolean
  vice_captain: boolean
}

export interface CaptainInterface {
  captains: { name: string; id: number }
  viceCaptains: { name: string; id: number }
}
