import { APP_ACTIONS, Actions } from './actions';
import { NotificationInterface } from './types';
interface InitialStateInterface {
    showLoader: boolean;
    notification: NotificationInterface | null;
    isLoggedIn: boolean;
}
const initialState = {
    showLoader: false,
    notification: null,
    isLoggedIn: false,
};
const appReducer = (state: InitialStateInterface = initialState, action: Actions): InitialStateInterface => {
    switch (action.type) {
        case APP_ACTIONS.SHOW_LOADER:
            return { ...state, showLoader: action.payload };
        case APP_ACTIONS.SHOW_NOTIFICATION:
            return { ...state, notification: action.payload };
        case APP_ACTIONS.SET_LOGGED_IN_STATUS:
            return { ...state, isLoggedIn: action.payload };
        default:
            return state;
    }
};

export default appReducer;
