import { createAction, handleActions } from 'redux-actions';

import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

import * as authApi from '../lib/api/auth'

//로그인
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
//아이디찾기
export const [SEARCHID, SEARCHID_SUCCESS, SEARCHID_FAILURE] = createRequestActionTypes('auth/SEARCHID');
//비밀번호찾기
export const [SEARCHPW, SEARCHPW_SUCCESS, SEARCHPW_FAILURE] = createRequestActionTypes('auth/SEARCHPW');

export const [UPDATEPW, UPDATEPW_SUCCESS, UPDATEPW_FAILURE] = createRequestActionTypes('auth/UPDATEPW');


export const [INFO, INFO_SUCCESS, INFO_FAILURE] = createRequestActionTypes('user/INFO');
export const fetchUser = createAction(INFO);
const fetchUserSaga = createRequestSaga(INFO, authApi.userInfo);


export const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] = createRequestActionTypes('user/UPDATE');
export const updateUser = createAction(UPDATE, (userId, update, form) => ({ userId, update, form }));
const updateUserSaga = createRequestSaga(UPDATE, authApi.updateUser);

const INITIALIZE = 'auth/INITIALIZE';
export const initialize = createAction(INITIALIZE);

const initialState = {
    search: {
        searchId: [],
        searchPw: 0,
        msg: '',
        updateAuth: null,
        updateAuthError: null,
    },
    info: {
        id: null,
        accountId: '',
        name: '',
        location: '',
        tel: '',
    },
    user: {
        token: null,
    },
    update: {
        success: null,
        error: null,
    },
    authError: null,
}

export const updatePassword = createAction(UPDATEPW, form => form);
const updatePasswordSaga = createRequestSaga(UPDATEPW, authApi.updatePw);

export const login = createAction(LOGIN, form => form);
const loginSaga = createRequestSaga(LOGIN, authApi.login);

const SEARCH_MESSAGE = 'auth/SEARCHMESSAGE';
export const searchMessage = createAction(SEARCH_MESSAGE, message => message);

export const findId = createAction(SEARCHID, form => form);
const searchIdSaga = createRequestSaga(SEARCHID, authApi.searchId);
export const findPw = createAction(SEARCHPW, form => form);
const searchPwSaga = createRequestSaga(SEARCHPW, authApi.searchPw);


const auth = handleActions({
    [INITIALIZE]: state => initialState,
    [SEARCH_MESSAGE]: (state, { payload }) => produce(state, draft => {
        draft.search.msg = payload;
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => produce(state, draft => {
        draft.authError = null;
        draft.user.token = auth.token;
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        draft.authError = error;
    }),
    [SEARCHID_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.search.searchId.push(...payload);
    }),
    [SEARCHPW_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.search.searchPw = payload;
    }),
    [SEARCHPW_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        if (error.response.status === 404)
            draft.search.msg = error.response.data;
    }),
    [SEARCHID_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        if (error.response.status === 404)
            draft.search.msg = error.response.data;
    }),
    [UPDATEPW_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.search.updateAuth = payload;
    }),
    [UPDATEPW_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        if (error.response.status === 400)
            draft.search.updateAuthError = error;
    }),
    [INFO_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.info.id = payload.account.id;
        draft.info.accountId = payload.account.accountId;
        draft.info.name = payload.account.name;
        draft.info.location = payload.account.location;
        draft.info.tel = payload.account.tel;

    }),
    [INFO_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        draft.infoError = error
    }),
    [UPDATE_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.update.success = payload;
        draft.update.error = null;
    }),
    [UPDATE_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        draft.update.success = null;
        draft.update.error = error;
    })
}, initialState)

export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(SEARCHID, searchIdSaga);
    yield takeLatest(SEARCHPW, searchPwSaga);
    yield takeLatest(UPDATEPW, updatePasswordSaga);
    yield takeLatest(INFO, fetchUserSaga);
    yield takeLatest(UPDATE, updateUserSaga);
}
export default auth;