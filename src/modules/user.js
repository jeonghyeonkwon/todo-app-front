import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import produce from 'immer'

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
        console.log('토큰이 지워졌습니다.')
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
        id: null,
        accountId: null,
        accountName: null,
    },
    checkError: null,
}
export default handleActions(
    {
        [CHECK_SUCCESS]: (state, { payload: auth }) => produce(state, draft => {
            draft.account.id = auth.id;
            draft.account.accountId = auth.accountId;
            draft.account.accountName = auth.accountName;
            draft.checkError = null;
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => produce(state, draft => {
            draft.account.id = null;
            draft.account.accountId = null;
            draft.account.accountName = null;
            draft.checkError = error;
        }),

        [LOGOUT]: state => produce(state, draft => {
            draft.account.id = null;
            draft.account.accountId = null;
            draft.account.accountName = null;
        }),
    }, initialState
)