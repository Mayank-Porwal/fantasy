import { Tab, Tabs } from '@mui/material'
import * as React from 'react'
import { DEFAULT_AVAILABLE_PLAYERS_TABS_DATA, PlayersCountInterface } from '../CardTable/constants'
import { CREATE_TEAM_FLOW } from '../../container/CreateTeam/constants'
import { PLAYERS_INTERFACE } from '../../container/CreateTeam/types'
interface Props {
  tabsData: { id: string; name: string }[] | []
  onChange: Function
  value: string
  flow?: string
  dataCount?: PlayersCountInterface
}
export default function FantasyTabs(props: Props) {
  const [value, setValue] = React.useState(props.value ? props.value : DEFAULT_AVAILABLE_PLAYERS_TABS_DATA[0].id)
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    props.onChange(newValue)
  }
  return (
    <Tabs
      value={value}
      onChange={(event, newValue) => {
        if (props.flow && props.flow !== CREATE_TEAM_FLOW.SELECTED_PLAYERS) {
          handleChange(event, newValue)
        }
      }}
      aria-label='Fantasy Tabs'
      textColor='secondary'
      indicatorColor='secondary'
      variant='scrollable'
      scrollButtons='auto'
    >
      {props.tabsData &&
        props.tabsData.map((tab) => {
          return (
            <Tab
              key={tab.id}
              value={tab.id}
              label={`${tab.name} ${
                props.dataCount && props.flow === CREATE_TEAM_FLOW.SELECTED_PLAYERS
                  ? `(${tab?.id === 'all' ? `${props.dataCount[tab.id]} / 11` : props.dataCount[tab.id]})`
                  : ''
              }`}
            />
          )
        })}
    </Tabs>
  )
}
