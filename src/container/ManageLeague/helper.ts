import { MANAGE_LEAGUES_COLUMNS } from './columns'

export const getManageLeagueColumns = () => {
  return [...MANAGE_LEAGUES_COLUMNS]
}

export const getTableTitle = (tabValue: string) => {
  return tabValue === 'myLeague' ? 'My Leagues' : 'Public Leagues'
}
