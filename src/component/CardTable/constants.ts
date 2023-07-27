import { CATEGORY_ENUM, CATEGORY_ENUM_BY_KEY } from '../../utils/constants';

export const DEFAULT_AVAILABLE_PLAYERS_TABS_DATA = [
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
];

export interface PlayersCountInterface {
    [key: string]: number;
}

export interface KeyPair<T, U> {
    key: T;
    value: U;
}
