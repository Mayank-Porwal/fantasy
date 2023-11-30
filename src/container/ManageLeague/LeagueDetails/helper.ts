import Cookies from 'js-cookie'
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

export const checkLeagueOwnerOrNot = (leagueOwnerId: number | undefined) => {
  if (!leagueOwnerId) {
    return true
  }
  const owner = Cookies.get('id')
  if (owner) {
    return parseInt(owner) === leagueOwnerId ? false : true
  }
  return true
}
