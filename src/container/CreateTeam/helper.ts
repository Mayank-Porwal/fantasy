import { CATEGORY_ENUM, CATEGORY_ENUM_BY_KEY, MAXIMUM_ALLOWED_PLAYERS } from '../../utils/constants'
import { FetchLeagueResponseInterface, LeagueResponseDataInterface } from '../ManageLeague/types'
import { C, CREATE_TEAM_VALIDATION_MESSAGES, VC } from './constants'
import { CaptainInterface, CreateTeamInterface, PLAYERS_INTERFACE, TeamDetailsInterface, TeamInterface } from './types'
import _ from 'lodash'
export const updatePlayerList = (
  player: PLAYERS_INTERFACE,
  playersList: PLAYERS_INTERFACE[] | [],
  updatePlayerList: PLAYERS_INTERFACE[] | [],
) => {
  if (!player || !playersList) {
    return { allPlayers: playersList, selectedPlayers: updatePlayerList }
  }
  const players = [...playersList]
  const updatePlayers = [...updatePlayerList]
  const searchPlayerIndex = players.findIndex((play) => play.id === player.id)
  if (searchPlayerIndex > -1) {
    updatePlayers.unshift(players[searchPlayerIndex])
    players.splice(searchPlayerIndex, 1)
  }
  return { allPlayers: players, selectedPlayers: updatePlayers }
}

export const searchAvailablePlayers = (availablePlayers: PLAYERS_INTERFACE[] | [], searchText: string) => {
  if (!searchText) {
    return availablePlayers
  }
  const filterPlayers = availablePlayers.filter((player) =>
    player.name.toLowerCase().includes(searchText.toLowerCase()),
  )
  return filterPlayers
}

export const getFilteredData = (playersData: PLAYERS_INTERFACE[] | [], filterValue: string, searchString: string) => {
  let filteredData: PLAYERS_INTERFACE[] | [] = []
  switch (filterValue) {
    case CATEGORY_ENUM_BY_KEY.Batsman:
      filteredData = playersData.filter((player) => player.category === 'batsman')
      filteredData = searchAvailablePlayers(filteredData, searchString)
      break
    case CATEGORY_ENUM_BY_KEY.Bowler:
      filteredData = playersData.filter((player) => player.category === 'bowler')
      filteredData = searchAvailablePlayers(filteredData, searchString)
      break
    case CATEGORY_ENUM_BY_KEY['All Rounder']:
      filteredData = playersData.filter((player) => player.category === 'ar')
      filteredData = searchAvailablePlayers(filteredData, searchString)
      break
    case CATEGORY_ENUM_BY_KEY['Wicket Keeper']:
      filteredData = playersData.filter((player) => player.category === 'wk')
      filteredData = searchAvailablePlayers(filteredData, searchString)
      break
    default:
      filteredData = [...playersData]
      filteredData = searchAvailablePlayers(filteredData, searchString)
  }
  return filteredData
}
export const maximumPlayerAllowedValidation = (selectedPlayers: PLAYERS_INTERFACE[] | null, capData: number) => {
  if (!selectedPlayers) {
    return { flag: true, message: '' }
  }
  if (selectedPlayers.length > MAXIMUM_ALLOWED_PLAYERS.CRICKET - 1) {
    return { flag: false, message: CREATE_TEAM_VALIDATION_MESSAGES.MAXIMUM_ALLOWED_PLAYERS }
  }
  const cap =
    selectedPlayers.length > 0
      ? selectedPlayers.reduce((accumulator: number, player: PLAYERS_INTERFACE) => {
          return accumulator + player.cap
        }, 0)
      : 0
  if (cap > 100) {
    return { flag: false, message: CREATE_TEAM_VALIDATION_MESSAGES.MAXIMUM_CAP }
  }
  return { flag: true, message: '' }
}

export const checkMaximumPlayerAllowedValidation = (
  selectedPlayers: PLAYERS_INTERFACE[] | [],
  teamInfo: { teamName: string; league: string },
  captainData: CaptainInterface | null,
) => {
  if (
    selectedPlayers.length < MAXIMUM_ALLOWED_PLAYERS.CRICKET ||
    !teamInfo.teamName ||
    !captainData ||
    !teamInfo.league
  ) {
    return true
  }
  if (!captainData?.captains?.id) {
    return true
  }
  if (!captainData?.viceCaptains?.id) {
    return true
  }
  return false
}

export const minimumPlayersByCategory = (selectedPlayers: PLAYERS_INTERFACE[] | []) => {
  if (selectedPlayers.length === 0) {
    return { error: true, message: CREATE_TEAM_VALIDATION_MESSAGES.ELEVEN_PLAYERS_REQUIRED_TO_CREATE_A_TEAM }
  }
  const searchBatsman = selectedPlayers.find((player) => player.category === 'batsman')
  const searchBowler = selectedPlayers.find((player) => player.category === 'bowler')
  const searchAr = selectedPlayers.find((player) => player.category === 'ar')
  const searchWk = selectedPlayers.find((player) => player.category === 'wk')
  if (searchAr && searchWk && searchBowler && searchBatsman) {
    return { error: false, message: '' }
  } else {
    return { error: true, message: CREATE_TEAM_VALIDATION_MESSAGES.MINIMUM_PLAYERS_REQUIRED }
  }
}

export const createTeamRequestBody = (
  selectedPlayers: PLAYERS_INTERFACE[],
  teamForm: { teamName: string; league: string; teamId: number; substitutions: number },
  captainData: CaptainInterface | null,
  subs: number,
) => {
  const request: CreateTeamInterface = {
    //team_name: teamForm.teamName,
    team_id: teamForm.teamId,
    players: getPlayersForRequestBody(selectedPlayers, captainData),
    substitutions: subs,
  }
  return request
}

const getPlayersForRequestBody = (players: PLAYERS_INTERFACE[], captainData: CaptainInterface | null) => {
  return players.map((player) => {
    return {
      id: player.id,
      captain: captainData?.captains?.id === player.id ? true : false,
      vice_captain: captainData?.viceCaptains?.id === player.id ? true : false,
    }
  })
}

export const setCaptainAndViceCaptain = (
  type: string,
  player: PLAYERS_INTERFACE,
  captainsData: CaptainInterface | null,
) => {
  let captainData = captainsData
    ? captainsData
    : { captains: { name: '', id: NaN }, viceCaptains: { name: '', id: NaN } }
  if (type === C) {
    if (captainData.viceCaptains) {
      if (captainData.viceCaptains.id !== player.id) {
        captainData = { ...captainData, captains: { name: player.name, id: player.id } }
      }
    } else {
      captainData = { ...captainData, captains: { name: player.name, id: player.id } }
    }
  } else if (type === VC) {
    if (captainData.captains) {
      if (captainData.captains.id !== player.id) {
        captainData = { ...captainData, viceCaptains: { name: player.name, id: player.id } }
      }
    } else {
      captainData = { ...captainData, viceCaptains: { name: player.name, id: player.id } }
    }
  }
  return captainData
}

export const getUpdatedLeagueOptions = (leagueData: LeagueResponseDataInterface[] | []) => {
  return leagueData.map((x) => {
    return { id: x.league_id, name: x.league_name }
  })
}

export const prePopulateSelectedPlayers = (
  selectedPlayers: TeamDetailsInterface | null,
  allPlayers: PLAYERS_INTERFACE[] | [],
) => {
  if (!selectedPlayers) {
    return {
      playersList: allPlayers ? allPlayers : [],
      selectedPlayers: [],
    }
  }
  const cloneSelectedPlayers = _.cloneDeep(selectedPlayers)
  const cloneAllPlayers = _.cloneDeep(allPlayers)
  selectedPlayers.draft_team.forEach((player) => {
    const findPlayerIndex = cloneAllPlayers.findIndex((x) => x.id === player.id)
    if (findPlayerIndex > -1) {
      cloneAllPlayers.splice(findPlayerIndex, 1)
    }
  })
  return {
    playersList: cloneAllPlayers,
    selectedPlayers: cloneSelectedPlayers.draft_team,
  }
}

export const updatedSelectedTeamByRemovingCaptainData = (selectedPlayers: TeamInterface[] | []) => {
  if (!selectedPlayers) {
    return []
  }
  let updatedTeam: PLAYERS_INTERFACE[] = []
  selectedPlayers.forEach((player) => {
    updatedTeam.push({
      cap: player.cap,
      category: player.category,
      id: player.id,
      img: player.img,
      name: player.name,
      team: player.team,
      team_img: '',
    })
  })
  return updatedTeam
}

export const getCaptainDataFromSelectedTeam = (selectedPlayers: TeamInterface[] | []) => {
  if (!selectedPlayers) {
    return null
  }
  const captain = selectedPlayers.find((player) => player.captain)
  const viceCaptain = selectedPlayers.find((player) => player.vice_captain)
  if (captain && viceCaptain) {
    return {
      captains: { name: captain.name, id: captain.id },
      viceCaptains: { name: viceCaptain.name, id: viceCaptain.id },
    }
  }
  return null
}

export const getSubsDataAfterDelete = (
  subs: number,
  selectedPlayerData: PLAYERS_INTERFACE,
  lastSubmittedTeam: TeamInterface[] | null,
) => {
  if (!selectedPlayerData) {
    return subs
  }
  if (!lastSubmittedTeam || (Array.isArray(lastSubmittedTeam) && lastSubmittedTeam.length === 0)) {
    return subs
  }
  return subs - 1
}

export const getSubsAfterAddPlayer = (
  subs: number,
  selectedPlayerData: PLAYERS_INTERFACE,
  lastSubmittedTeam: TeamInterface[] | null,
) => {
  if (!selectedPlayerData) {
    return subs
  }
  if (!lastSubmittedTeam || (Array.isArray(lastSubmittedTeam) && lastSubmittedTeam.length === 0)) {
    return subs
  }
  let cloneSubs = subs
  const findData = lastSubmittedTeam.find((team) => team.id === selectedPlayerData.id)
  if (findData) {
    cloneSubs++
  }

  return cloneSubs
}

export const getCapData = (selectedPlayersList: PLAYERS_INTERFACE[] | null) => {
  if (!selectedPlayersList) {
    return 0
  }

  const updateCapData = selectedPlayersList.reduce((accumulator, player) => {
    return accumulator + player.cap
  }, 0)
  return updateCapData
}

export const getUpdatedCapDataAfterDelete = (totalCap: number, selectedPlayerData: PLAYERS_INTERFACE) => {
  if (!selectedPlayerData) {
    return totalCap
  }
  return totalCap - selectedPlayerData.cap
}

export const getUpdatedCapDataAfterAddPlayer = (totalCap: number, selectedPlayerData: PLAYERS_INTERFACE) => {
  if (!selectedPlayerData) {
    return totalCap
  }
  return totalCap + selectedPlayerData.cap
}

export const findLeagueById = (leagueData: FetchLeagueResponseInterface | null, leagueId: number) => {
  if (!leagueData) {
    return null
  }
  const findLeague = leagueData.data.find((league) => league.league_id === leagueId)
  return findLeague ? findLeague : null
}

export const getUpdatedCaptainData = (captainData: CaptainInterface | null, selectedPlayerData: PLAYERS_INTERFACE) => {
  if (!captainData) {
    return null
  }
  console.log(selectedPlayerData, captainData)
  let updatedCaptainData = _.cloneDeep(captainData)
  if (selectedPlayerData.id === captainData.captains?.id) {
    updatedCaptainData.captains = null
  }
  if (selectedPlayerData.id === captainData.viceCaptains?.id) {
    updatedCaptainData.viceCaptains = null
  }
  return updatedCaptainData
}
