import Cookies from 'js-cookie'
import { CompletedMatchesDataInterface, MatchLeaderBoardInterface } from '../types'
import { cloneDeep } from 'lodash'
export const getCompletedMatchesOptions = (completedMatches: CompletedMatchesDataInterface[] | null) => {
  if (!completedMatches) {
    return []
  }
  return completedMatches.map((match) => {
    return { id: match.match_id, name: `${match.number} - ${match.match}` }
  })
}

export const getColorBasedOnPoints = (points: number) => {
  if (points < 30) {
    return '#ff7373'
  } else if (points >= 30 && points < 75) {
    return '#ffd700'
  } else {
    return '#66cdaa'
  }
}

export const getUpdatedLeaderBoardByOwner = (leaders: MatchLeaderBoardInterface[] | null) => {
  if (!leaders) {
    return []
  }
  const loggedInUser = Cookies.get('id')
  const updatedLeaders = cloneDeep(leaders).sort((a, b) => {
    return a.rank - b.rank
  })

  if (loggedInUser) {
    const findLoggedInUser = updatedLeaders.findIndex((x) => x.user_id === parseInt(loggedInUser))
    if (findLoggedInUser > -1) {
      const currentUserData = updatedLeaders[findLoggedInUser]
      updatedLeaders.splice(findLoggedInUser, 1)
      updatedLeaders.unshift(currentUserData)
    }
  }
  return updatedLeaders
}
