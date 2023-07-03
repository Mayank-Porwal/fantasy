import { APP_ACTIONS, Actions } from "./actions";
import { NotificationInterface } from "./types";
interface InitialStateInterface {
  showLoader: boolean;
  notification: NotificationInterface | null;
}
const initialState = {
  showLoader: false,
  notification: null,
};
const appReducer = (
  state: InitialStateInterface = initialState,
  action: Actions
): InitialStateInterface => {
  switch (action.type) {
    case APP_ACTIONS.SHOW_LOADER:
      return { ...state, showLoader: action.payload };
    case APP_ACTIONS.SHOW_NOTIFICATION:
      return { ...state, notification: action.payload };
    default:
      return state;
  }
};

export default appReducer;
