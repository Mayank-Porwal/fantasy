import { PLAYERS_INTERFACE } from '../../container/CreateTeam/types';
import { CATEGORY_ENUM_BY_KEY } from './../../utils/constants';
import { DEFAULT_AVAILABLE_PLAYERS_TABS_DATA, PlayersCountInterface } from './constants';

export const getSelectedPlayersCount = (players: PLAYERS_INTERFACE[] | [] | null) => {
    let countObject: PlayersCountInterface = {
        [CATEGORY_ENUM_BY_KEY.All]: 0,
        [CATEGORY_ENUM_BY_KEY.Batsman]: 0,
        [CATEGORY_ENUM_BY_KEY.Bowler]: 0,
        [CATEGORY_ENUM_BY_KEY['All Rounder']]: 0,
        [CATEGORY_ENUM_BY_KEY['Wicket Keeper']]: 0,
    };
    if (!players) {
        return countObject;
    }
    players.forEach((play) => {
        if (countObject[play.category.toLowerCase()] || countObject[play.category.toLowerCase()] === 0) {
            countObject = {
                ...countObject,
                [play.category]: countObject[play.category] + 1,
            };
        } else {
            countObject = { ...countObject, [play.category]: 0 };
        }
    });
    return { ...countObject, [DEFAULT_AVAILABLE_PLAYERS_TABS_DATA[0].id]: players.length };
};
