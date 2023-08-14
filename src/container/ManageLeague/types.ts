export interface CreateLeaguePayloadInterface {
  leagueData: { league_name: string; type: string }
  teamName: string
}

export interface JoinLeaguePayloadInterface {
  team_name: string
  code: string
}
