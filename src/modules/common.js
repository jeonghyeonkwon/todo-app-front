import { createAction, handleActions } from 'redux-actions';

import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';

import * as commonApi from '../lib/api/common'



export const [LOCAL, LOCAL_SUCCESS, LOCAL_FAILURE] = createRequestActionTypes('common/LOCAL');

export const localList = createAction(LOCAL);
const localListSaga = createRequestSaga(LOCAL, commonApi.localList);

const initialState = {
    local: [],
}

export default handleActions({
    [LOCAL_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.local = payload.local;
    })
}, initialState);

export function* commonSaga() {
    yield takeLatest(LOCAL, localListSaga);
}
