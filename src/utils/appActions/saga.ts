import { put, takeLatest } from 'redux-saga/effects';
function* fetchNews() {
    yield put({ type: 'NEWS_RECEIVED', json: [] });
}
export function* appSaga() {
    yield takeLatest('GET_NEWS', fetchNews);
}
