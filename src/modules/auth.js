import { createAction, handleActions } from 'redux-actions';

import producer from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

import * as authApi from '../lib/api/auth'

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const initialState = {
    auth: {
        token: null,
    },
    authError: null,
}
export const login = createAction(LOGIN, ({ username, password }) => ({
    username, password
}));
const loginSaga = createRequestSaga(LOGIN, authApi.login);

const auth = handleActions({
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
        ...state,
        authError: null,
        auth
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
        ...state,
        authError: error,
    })
}, initialState)

export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
}
export default auth;