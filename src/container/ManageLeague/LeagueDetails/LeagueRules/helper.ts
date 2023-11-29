import { RulesDataInterface } from '../types'
import { cloneDeep } from 'lodash'
import { RULE_VALUE } from './constants'
export const updateRulesData = (
  isActiveValue: boolean,
  textValue: string | number,
  rulesData: RulesDataInterface[] | null,
  type: string,
  selectedRule: RulesDataInterface,
) => {
  if (!rulesData) {
    return []
  }
  const rulesDataClone = cloneDeep(rulesData)
  const searchData = rulesDataClone.find((x) => x.id === selectedRule.id)
  if (searchData) {
    if (type === RULE_VALUE) {
      searchData.value = textValue
    } else {
      searchData.is_active = isActiveValue
    }
  }
  return rulesDataClone
}
