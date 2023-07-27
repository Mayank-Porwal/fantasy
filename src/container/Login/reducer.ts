import { LOGIN_ACTIONS, LoginActions, signInFailure, registerSuccess, registerFailure } from './actions';
import { LoginSuccessInterface, RegisterSuccessInterface } from './types';
interface InitialState {
    signInSuccess: LoginSuccessInterface | null;
    signInFailed: any;
    registerSuccess: RegisterSuccessInterface | null;
    registerFailure: any;
}
const initialState = {
    signInSuccess: null,
    signInFailed: null,
    registerSuccess: null,
    registerFailure: null,
};
const loginReducer = (state: InitialState = initialState, action: LoginActions): InitialState => {
    switch (action.type) {
        case LOGIN_ACTIONS.SIGN_IN_SUCCESS:
            return { ...state, signInSuccess: action.payload };
        case LOGIN_ACTIONS.SIGN_IN_FAILURE:
            return { ...state, signInFailed: action.payload };
        case LOGIN_ACTIONS.REGISTER_SUCCESS:
            return { ...state, registerSuccess: action.payload };
        case LOGIN_ACTIONS.REGISTER_FAILURE:
            return { ...state, registerFailure: action.payload };
        default:
            return { ...state };
    }
};

export default loginReducer;
