import { UsersTeamsInterface } from '../../../utils/appActions/types'

export const getCreateLeagueRequestBody = (formData: {
  leagueName: string
  selectedTeam: string
  leagueType: boolean
}) => {
  const requestBody = {
    leagueData: {
      league_name: formData.leagueName ? formData.leagueName : '',
      type: formData.leagueType ? 'private' : 'public',
    },
    teamName: formData.selectedTeam ? formData.selectedTeam : '',
  }
  return requestBody
}

export const updateUsersTeamsOptions = (teamList: UsersTeamsInterface[]) => {
  return teamList.map((team) => {
    return { id: team.team_name, name: team.team_name }
  })
}
