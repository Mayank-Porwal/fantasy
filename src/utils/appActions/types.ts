export interface NotificationInterface {
  type: string
  message: string
}

export interface PopupInterface {
  open: boolean
  content: any
  size: 'md' | 'sm' | 'lg'
  title: string
}

export interface UsersTeamsInterface {
  team_name: string
  players: PlayersInterface[]
}

export interface PlayersInterface {
  captain: boolean
  vice_captain: boolean
  id: number
}

export interface ToggleData {
  toggled: boolean
  isCollapsed: boolean
  isMobile: boolean
}
