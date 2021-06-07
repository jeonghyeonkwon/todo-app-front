import produce from 'immer';

import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'

import * as boardApi from '../lib/api/board';

export const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes('study/LIST');
export const studyList = createAction(LIST, ({ skill, page, local }) => ({ skill, page, local }))
const studyListSaga = createRequestSaga(LIST, boardApi.studyList);


export const [WRITE, WRITE_SUCCESS, WRITE_FAILURE] = createRequestActionTypes('study/WRITE');
export const studyWrite = createAction(WRITE, (id, boardType, skill, form) => ({ id, boardType, skill, form }));
const studyWriteSage = createRequestSaga(WRITE, boardApi.createBoard);

const INITIALIZE = 'study/INITIALIZE';
export const initialize = createAction(INITIALIZE);

const initialState = {
    list: {
        content: [],
        totalElements: 0,
        totalPages: 0,
    },
    write: null,
    error: {
        write: null
    }
}
export default handleActions({
    [INITIALIZE]: (state) => initialState,
    [LIST_SUCCESS]: (state, { payload }) => produce(state, draft => {

        draft.list.content = [...payload.content];
        draft.list.totalElements = payload.totalElements;
        draft.list.totalPages = payload.totalPages;
    }),
    [WRITE_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.write = payload;
    }),
    [WRITE_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        draft.error.write = error;
    })


}, initialState)

export function* studySaga() {
    yield takeLatest(LIST, studyListSaga);
    yield takeLatest(WRITE, studyWriteSage);
}