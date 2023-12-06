import { PublicLeagueDataInterface } from '../types'

export const getJoinLeagueRequestBody = (
  formData: { code: string; selectedTeam: string },
  flow: string,
  selectedRow: PublicLeagueDataInterface | null,
) => {
  if (flow === 'private') {
    return {
      code: formData.code ? formData.code : '',
      team_name: formData.selectedTeam ? formData.selectedTeam : '',
      league_id: null,
    }
  } else {
    return {
      code: '',
      league_id: selectedRow ? selectedRow.league_id : '',
      team_name: formData.selectedTeam ? formData.selectedTeam : '',
    }
  }
}

export const validateFormData = (formData: { code: string; selectedTeam: string }, flow: string) => {
  if (!formData) {
    return true
  }
  if (flow === 'private') {
    if (formData.code && formData.selectedTeam) {
      return false
    }
  } else {
    if (formData.selectedTeam) {
      return false
    }
  }

  return true
}
