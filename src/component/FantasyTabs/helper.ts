import { CREATE_TEAM_FLOW } from '../../container/CreateTeam/constants'
import { PlayersCountInterface } from '../CardTable/constants'

export const getTabColor = (dataCount: PlayersCountInterface | undefined, tabId: string, flow: string | undefined) => {
  let color = ''
  if (dataCount && flow && flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS) {
    if (tabId === 'all') {
      color = dataCount[tabId] < 11 ? 'red' : ''
    } else {
      if (!dataCount[tabId]) {
        color = 'red'
      } else {
        color = ''
      }
    }
  }
  return color
}
