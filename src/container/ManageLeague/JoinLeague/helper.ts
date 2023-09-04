export const getJoinLeagueRequestBody = (formData: { code: string; selectedTeam: string }) => {
  return {
    code: formData.code ? formData.code : '',
    team_name: formData.selectedTeam ? formData.selectedTeam : '',
  }
}

export const validateFormData = (formData: { code: string; selectedTeam: string }) => {
  if (!formData) {
    return true
  }
  if (formData.code && formData.selectedTeam) {
    return false
  }
  return true
}
