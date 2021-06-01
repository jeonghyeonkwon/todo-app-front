import { createAction, handleActions } from 'redux-actions'

import produce from 'immer';

import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'

import * as registerApi from '../lib/api/register'
export const CONST_REGISTER = 'register/REGISTER';
export const CONST_LOCALLIST = 'register/LOCALLIST';
export const CONST_IDCHECK = 'register/IDCHECK';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(CONST_REGISTER);

const [LOCALLIST, LOCALLIST_SUCCESS, LOCALLIST_FAILURE] = createRequestActionTypes(CONST_LOCALLIST);

const [IDCHECK, IDCHECK_SUCCESS, IDCHECK_FAILURE] = createRequestActionTypes(CONST_IDCHECK);
const CHANGE_FIELD = 'register/CHANGE_FIELD';
const CHANGE_MESSAGE = 'register/CHANGE_MESSAGE';
const INITIALIZE = 'register/INITIALIZE';
export const initialize = createAction(INITIALIZE);


const initialState = {
    localList: [],
    form: {
        accountId: '',
        password: '',
        rePassword: '',
        name: '',
        location: '서울',
        validateCheck: false,
    },
    msg: '',
    auth: null,
    authError: null,
}
export const changeField = createAction(
    CHANGE_FIELD,
    ({ key, value }) => ({
        key, value
    })
)

export const changeMessage = createAction(
    CHANGE_MESSAGE,
    value => value
)
export const localList = createAction(LOCALLIST);
const localSage = createRequestSaga(LOCALLIST, registerApi.localList);

export const idCheck = createAction(IDCHECK, accountId => accountId);
const idCheckSaga = createRequestSaga(IDCHECK, registerApi.idCheck)

export const registerUser = createAction(REGISTER, form => form);
const registerUserSage = createRequestSaga(REGISTER, registerApi.register);

export default handleActions({
    [INITIALIZE]: state => initialState,

    [LOCALLIST_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.localList.push(...payload.local);
    }),
    [IDCHECK_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.msg = payload;
        draft.form.validateCheck = true;
    }),
    [IDCHECK_FAILURE]: (state, { payload }) => produce(state, draft => {
        if (payload.response.status === 409)
            draft.msg = payload.response.data.message;
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => produce(state, draft => {
        draft.form[key] = value;
    }),
    [CHANGE_MESSAGE]: (state, { payload: value }) => produce(state, draft => {
        draft.msg = value;
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => produce(state, draft => {
        draft.authError = null;
        draft.auth = auth;
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        draft.authError = error;
    })
}, initialState);

export function* registerSaga() {
    yield takeLatest(LOCALLIST, localSage);
    yield takeLatest(IDCHECK, idCheckSaga);
    yield takeLatest(REGISTER, registerUserSage);
}
