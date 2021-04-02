import { createAction, handleActions } from 'redux-actions';

import { takeLatest, call } from 'redux-saga/effects';

import * as authAPI from '../lib/api/auth'

import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'

const TEMP_SET_USER = 'user/TEMP_SET_USER';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');

const LOGOUT = 'user/LOGOUT';


export const check = createAction(CHECK, token => token);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
    try {
        localStorage.removeItem('jwttoken');
        console.log('토큰이 지워졌습니다.')
    } catch (e) {
        console.log('localStorage가 작동 하지 않습니다');
    }
}
function logoutSaga() {
    try {

        localStorage.removeItem('jwttoken');
    } catch (e) {
        console.log(e);
    }
}

export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
    account: {
        accountId: null,
        accountName: null,
    },
    checkError: null,
}
export default handleActions(
    {
        [CHECK_SUCCESS]: (state, action) => ({
            ...state,
            account: action.payload,
            checkError: null,
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            account: {
                accountId: null,
                accountName: null
            },
            checkError: error,
        }),
        [LOGOUT]: state => ({
            ...state,
            account: {
                accountId: null,
                accountName: null
            },
        }),
    }, initialState
)