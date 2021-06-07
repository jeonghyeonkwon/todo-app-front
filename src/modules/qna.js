import produce from 'immer';

import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'

import * as boardApi from '../lib/api/board';

export const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes('qna/LIST');
export const qnaList = createAction(LIST, ({ skill, page }) => ({ skill, page }))
const qnaListSaga = createRequestSaga(LIST, boardApi.qnaList);

export const [WRITE, WRITE_SUCCESS, WRITE_FAILURE] = createRequestActionTypes('qna/WRITE');
export const qnaWrite = createAction(WRITE, (id, boardType, skill, form) => ({ id, boardType, skill, form }));
const qnaWriteSage = createRequestSaga(WRITE, boardApi.createBoard);


const INITIALIZE = 'qna/INITIALIZE';
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

export function* qnaSaga() {
    yield takeLatest(LIST, qnaListSaga);
    yield takeLatest(WRITE, qnaWriteSage);
}