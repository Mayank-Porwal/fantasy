import { RulesDataInterface } from './types'

export const getUpdateRulesRequestBody = (updatedRulesData: RulesDataInterface[] | null, leagueId: string | null) => {
  if (!leagueId || !updatedRulesData) {
    return null
  }
  return {
    league_id: parseInt(leagueId),
    rule_data: updatedRulesData,
  }
}
