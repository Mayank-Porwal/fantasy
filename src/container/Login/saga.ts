import { all, call, put, takeLatest } from 'redux-saga/effects';
import { API_URLS, HTTPS_HEADERS, MESSAGES, REQUEST_TYPE, ResponseGenerator } from '../../utils/constants';
import { _request } from '../../utils/utils';
import * as actionTypes from './actions';

function* login(action: actionTypes.SignInInterFace) {
    try {
        const response: ResponseGenerator = yield call(_request, {
            url: API_URLS.LOGIN,
            method: REQUEST_TYPE.POST,
            headers: HTTPS_HEADERS,
            data: action.payload,
        });
        if (response.status && response.status >= 200 && response.status <= 299) {
            yield put(actionTypes.signInSuccess(response?.data));
        } else {
            yield put(
                actionTypes.signInFailure(
                    response?.response?.data ? response?.response?.data : { message: MESSAGES.SOMETHING_WENT_WRONG },
                ),
            );
        }
    } catch (e) {
        yield put(actionTypes.signInFailure({ message: MESSAGES.SOMETHING_WENT_WRONG }));
        console.error(e);
    }
}

function* register(action: actionTypes.RegisterInterFace) {
    try {
        const response: ResponseGenerator = yield call(_request, {
            url: API_URLS.REGISTER,
            method: REQUEST_TYPE.POST,
            headers: HTTPS_HEADERS,
            data: action.payload,
        });
        if (response.status && response.status >= 200 && response.status <= 299) {
            yield put(actionTypes.registerSuccess(response?.data));
        } else {
            debugger
            console.log(response.response);
            yield put(
                actionTypes.registerFailure(
                    response?.response?.data ? response?.response?.data : { message: MESSAGES.SOMETHING_WENT_WRONG },
                ),
            );
        }
    } catch (e) {
        yield put(actionTypes.registerFailure({ message: MESSAGES.SOMETHING_WENT_WRONG }));
        console.error(e);
    }
}

function* loginSaga() {
    yield all([
        takeLatest(actionTypes.LOGIN_ACTIONS.SIGN_IN, login),
        takeLatest(actionTypes.LOGIN_ACTIONS.REGISTER, register),
    ]);
}

export default loginSaga;
