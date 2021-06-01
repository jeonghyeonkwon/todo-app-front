import { createAction, handleActions } from 'redux-actions';

import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

import * as authApi from '../lib/api/auth'

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const initialState = {

    user: {
        token: null,
    },
    authError: null,
}
export const login = createAction(LOGIN, form => form);
const loginSaga = createRequestSaga(LOGIN, authApi.login);

const auth = handleActions({

    [LOGIN_SUCCESS]: (state, { payload: auth }) => produce(state, draft => {
        draft.authError = null;
        draft.user.token = auth.token;
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        draft.authError = error;
    })
}, initialState)

export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
}
export default auth;