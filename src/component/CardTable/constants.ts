import { CATEGORY_ENUM, CATEGORY_ENUM_BY_KEY } from '../../utils/constants'

export const DEFAULT_AVAILABLE_PLAYERS_TABS_DATA = [
  {
    id: CATEGORY_ENUM_BY_KEY['Current Match'],
    name: CATEGORY_ENUM.cm,
  },
  {
    id: CATEGORY_ENUM_BY_KEY.All,
    name: CATEGORY_ENUM.all,
  },
  {
    id: CATEGORY_ENUM_BY_KEY.Batsman,
    name: CATEGORY_ENUM.batsman,
  },
  {
    id: CATEGORY_ENUM_BY_KEY.Bowler,
    name: CATEGORY_ENUM.bowler,
  },
  {
    id: CATEGORY_ENUM_BY_KEY['All Rounder'],
    name: CATEGORY_ENUM.ar,
  },
  {
    id: CATEGORY_ENUM_BY_KEY['Wicket Keeper'],
    name: CATEGORY_ENUM.wk,
  },
]

export interface PlayersCountInterface {
  [key: string]: number
}

export interface KeyPair<T, U> {
  key: T
  value: U
}

export const PLAYING_ELEVEN_BOX_SHADOW =
  'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;'
export const NON_PLAYING_ELEVEN_BOX_SHADOW = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
