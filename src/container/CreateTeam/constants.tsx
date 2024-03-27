import GroupsIcon from '@mui/icons-material/Groups'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
export enum CREATE_TEAM_FLOW {
  ALL_PLAYERS = 'ALL_PLAYERS',
  SELECTED_PLAYERS = 'SELECTED_PLAYERS',
}

export const CREATE_TEAM_VALIDATION_MESSAGES = {
  MAXIMUM_ALLOWED_PLAYERS: 'Maximum of 11 players are allowed in a Team',
  ELEVEN_PLAYERS_REQUIRED_TO_CREATE_A_TEAM: '11 players are required to create a team',
  MINIMUM_PLAYERS_REQUIRED: 'Minimum of 1 player from each category is required to create a team',
  MAXIMUM_CAP: 'Maximum of 100 cap is allowed',
}

export const C = 'Captain'
export const VC = 'ViceCaptain'

export const DEFAULT_SUBS_DATA = 0

export const PREDICTION_SKIP = 'No Prediction'
export const SORTING_DATA = {
  direction: 'asc',
  flow: '',
}

export const BOTTOM_NAVIGATION_DATA = [
  {
    label: 'All Players',
    icon: <GroupsIcon />,
  },
  {
    label: 'My Team',
    icon: <MilitaryTechIcon />,
  },
]
