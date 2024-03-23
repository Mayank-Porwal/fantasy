import { cloneDeep } from 'lodash'
import { LeaguePlayersInterface } from '../../types'

export const getGridActions = (
  handleAction: Function,
): {
  id: string
  label: string
  onClick: Function
  disabled?: boolean
  buttonType?: 'text' | 'outlined' | 'contained' | undefined
  className?: string
  width?: string
}[] => {
  return [
    {
      id: 'delete',
      label: 'Delete',
      onClick: () => handleAction('delete'),
      buttonType: 'contained',
    },
  ]
}

export const getSortedLeaguePlayers = (leaguePlayers: LeaguePlayersInterface[]) => {
  if (!leaguePlayers) {
    return []
  }
  let sortedData = cloneDeep(leaguePlayers)
  sortedData = leaguePlayers.sort((a, b) => {
    return a.rank - b.rank
  })
  return sortedData
}
