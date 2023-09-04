import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '../../utils/constants'
import { getManageLeaguesColumns } from './columns'
import { FetchLeaguePayloadInterface, FilterDataInterface } from './types'

export const getManageLeagueColumns = (handleClickActions: Function) => {
  return getManageLeaguesColumns(handleClickActions)
}

export const getTableTitle = (tabValue: string) => {
  return tabValue === 'myLeague' ? 'My Leagues' : 'Public Leagues'
}

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

export const getLeaguesRequestBody = (filterData: FilterDataInterface[] | null, page: number, size: number) => {
  const activeFilter = [{ field: 'active', operator: 'equals', value: true }]
  const requestBody: FetchLeaguePayloadInterface = {
    page: page ? page : DEFAULT_PAGE_NUMBER,
    size: size ? size : DEFAULT_PAGE_SIZE,
    filter_data: filterData ? filterData.concat(activeFilter) : activeFilter,
  }
  return requestBody
}
