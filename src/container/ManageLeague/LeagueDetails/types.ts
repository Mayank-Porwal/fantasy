export interface RulesDataInterface {
  id: number
  rule: string
  type: string
  value: string | number
  is_active: boolean
}
export interface UpdateRulesRequestBodyInterface {
  league_id: number
  rule_data: RulesDataInterface[]
}
