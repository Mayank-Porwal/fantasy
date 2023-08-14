export const getJoinLeagueRequestBody = (formData: { code: string; selectedTeam: string }) => {
  return {
    code: formData.code ? formData.code : '',
    team_name: formData.selectedTeam ? formData.selectedTeam : '',
  }
}
