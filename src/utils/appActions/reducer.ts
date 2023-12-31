import { APP_ACTIONS, Actions } from './actions'
import { NotificationInterface, PopupInterface, ToggleData, UsersTeamsInterface } from './types'
interface InitialStateInterface {
  showLoader: boolean
  notification: NotificationInterface | null
  isLoggedIn: boolean
  popUpData: PopupInterface | null
  usersTeams: UsersTeamsInterface[] | null
  usersTeamsFailure: any
  toggleData: ToggleData
}
const initialState = {
  showLoader: false,
  notification: null,
  isLoggedIn: false,
  popUpData: null,
  usersTeams: null,
  usersTeamsFailure: null,
  toggleData: { toggled: false, isCollapsed: false, isMobile: window.innerWidth < 768 ? true : false },
}
const appReducer = (state: InitialStateInterface = initialState, action: Actions): InitialStateInterface => {
  switch (action.type) {
    case APP_ACTIONS.SHOW_LOADER:
      return { ...state, showLoader: action.payload }
    case APP_ACTIONS.SHOW_NOTIFICATION:
      return { ...state, notification: action.payload }
    case APP_ACTIONS.SET_LOGGED_IN_STATUS:
      return { ...state, isLoggedIn: action.payload }
    case APP_ACTIONS.SHOW_POPUP:
      return { ...state, popUpData: action.payload }
    case APP_ACTIONS.FETCH_USERS_TEAM_SUCCESS:
      return { ...state, usersTeams: action.payload }
    case APP_ACTIONS.FETCH_USERS_TEAM_FAILURE:
      return { ...state, usersTeamsFailure: action.payload }
    case APP_ACTIONS.SIDEBAR_TOGGLE_DATA:
      return { ...state, toggleData: action.payload }
    default:
      return state
  }
}

export default appReducer
