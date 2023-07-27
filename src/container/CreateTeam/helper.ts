import { CATEGORY_ENUM, CATEGORY_ENUM_BY_KEY, MAXIMUM_ALLOWED_PLAYERS } from '../../utils/constants';
import { C, CREATE_TEAM_VALIDATION_MESSAGES, VC } from './constants';
import { CaptainInterface, CreateTeamInterface, PLAYERS_INTERFACE } from './types';
export const updatePlayerList = (
    player: PLAYERS_INTERFACE,
    playersList: PLAYERS_INTERFACE[] | [],
    updatePlayerList: PLAYERS_INTERFACE[] | [],
) => {
    if (!player || !playersList) {
        return { allPlayers: playersList, selectedPlayers: updatePlayerList };
    }
    const players = [...playersList];
    const updatePlayers = [...updatePlayerList];
    const searchPlayerIndex = players.findIndex((play) => play.id === player.id);
    if (searchPlayerIndex > -1) {
        updatePlayers.unshift(players[searchPlayerIndex]);
        players.splice(searchPlayerIndex, 1);
    }
    return { allPlayers: players, selectedPlayers: updatePlayers };
};

export const searchAvailablePlayers = (availablePlayers: PLAYERS_INTERFACE[] | [], searchText: string) => {
    if (!searchText) {
        return availablePlayers;
    }
    const filterPlayers = availablePlayers.filter((player) =>
        player.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    return filterPlayers;
};

export const getFilteredData = (playersData: PLAYERS_INTERFACE[] | [], filterValue: string, searchString: string) => {
    let filteredData: PLAYERS_INTERFACE[] | [] = [];
    switch (filterValue) {
        case CATEGORY_ENUM_BY_KEY.Batsman:
            filteredData = playersData.filter((player) => player.category === 'batsman');
            filteredData = searchAvailablePlayers(filteredData, searchString);
            break;
        case CATEGORY_ENUM_BY_KEY.Bowler:
            filteredData = playersData.filter((player) => player.category === 'bowler');
            filteredData = searchAvailablePlayers(filteredData, searchString);
            break;
        case CATEGORY_ENUM_BY_KEY['All Rounder']:
            filteredData = playersData.filter((player) => player.category === 'ar');
            filteredData = searchAvailablePlayers(filteredData, searchString);
            break;
        case CATEGORY_ENUM_BY_KEY['Wicket Keeper']:
            filteredData = playersData.filter((player) => player.category === 'wk');
            filteredData = searchAvailablePlayers(filteredData, searchString);
            break;
        default:
            filteredData = [...playersData];
            filteredData = searchAvailablePlayers(filteredData, searchString);
    }
    return filteredData;
};

export const checkMaximumPlayerAllowedValidation = (
    selectedPlayers: PLAYERS_INTERFACE[] | [],
    teamName: string,
    captainData: CaptainInterface | null,
) => {
    if (selectedPlayers.length < MAXIMUM_ALLOWED_PLAYERS.CRICKET && !teamName && !captainData) {
        return true;
    }
    if (!captainData?.captains.id) {
        return true;
    }
    if (!captainData?.viceCaptains.id) {
        return true;
    }
    return false;
};

export const minimumPlayersByCategory = (selectedPlayers: PLAYERS_INTERFACE[] | []) => {
    if (selectedPlayers.length === 0) {
        return { error: true, message: CREATE_TEAM_VALIDATION_MESSAGES.ELEVEN_PLAYERS_REQUIRED_TO_CREATE_A_TEAM };
    }
    const searchBatsman = selectedPlayers.find((player) => player.category === 'batsman');
    const searchBowler = selectedPlayers.find((player) => player.category === 'bowler');
    const searchAr = selectedPlayers.find((player) => player.category === 'ar');
    const searchWk = selectedPlayers.find((player) => player.category === 'wk');
    if (searchAr && searchWk && searchBowler && searchBatsman) {
        return { error: false, message: '' };
    } else {
        return { error: true, message: CREATE_TEAM_VALIDATION_MESSAGES.MINIMUM_PLAYERS_REQUIRED };
    }
};

export const createTeamRequestBody = (
    selectedPlayers: PLAYERS_INTERFACE[],
    teamName: string,
    captainData: CaptainInterface,
) => {
    const request: CreateTeamInterface = {
        name: teamName,
        players: getPlayersForRequestBody(selectedPlayers, captainData),
        user_name: 'test2',
    };
    return request;
};

const getPlayersForRequestBody = (players: PLAYERS_INTERFACE[], captainData: CaptainInterface) => {
    return players.map((player) => {
        return {
            name: player.name,
            captain: captainData.captains.id === player.id ? true : false,
            vice_captain: captainData.viceCaptains.id === player.id ? true : false,
        };
    });
};

export const setCaptainAndViceCaptain = (
    type: string,
    player: PLAYERS_INTERFACE,
    captainsData: CaptainInterface | null,
) => {
    let captainData = captainsData
        ? captainsData
        : { captains: { name: '', id: NaN }, viceCaptains: { name: '', id: NaN } };
    if (type === C) {
        if (captainData.viceCaptains.id !== player.id) {
            captainData = { ...captainData, captains: { name: player.name, id: player.id } };
        }
    } else if (type === VC) {
        if (captainData.captains.id !== player.id) {
            captainData = { ...captainData, viceCaptains: { name: player.name, id: player.id } };
        }
    }
    return captainData;
};
