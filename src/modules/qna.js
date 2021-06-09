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

export const [DETAIL, DETAIL_SUCCESS, DETAIL_FAILURE] = createRequestActionTypes('qna/DETAIL');
export const fetchBoard = createAction(DETAIL, (boardType, id) => ({ boardType, id }));
const qnaDetailSaga = createRequestSaga(DETAIL, boardApi.boardDetail);

export const [COMMENT_WRITE, COMMENT_WRITE_SUCCESS, COMMENT_WRITE_FAILURE] = createRequestActionTypes('qna/COMMENT_WRITE');
export const commentWrite = createAction(COMMENT_WRITE, (userId, boardType, boardId, comment) => ({ userId, boardType, boardId, comment }))
const commentWriteSaga = createRequestSaga(COMMENT_WRITE, boardApi.writeComment);

export const [COMMENT_LIST, COMMENT_LIST_SUCCESS, COMMENT_LIST_FAILURE] = createRequestActionTypes('qna/COMMENT_LIST');
export const commentList = createAction(COMMENT_LIST, (boardType, boardId, page) => ({ boardType, boardId, page }))
const commentListSaga = createRequestSaga(COMMENT_LIST, boardApi.commentList);


const INITIALIZE = 'qna/INITIALIZE';
export const initialize = createAction(INITIALIZE);

const initialState = {
    list: {
        content: [],
        totalElements: 0,
        totalPages: 0,
    },
    write: null,
    detail: {
        id: null,
        title: '',
        contents: '',
        writer: '',
        programmingType: [],
        status: '',
        hit: 0,
        createBoard: '',
    },
    comment: {
        content: [],
        totalPages: 0,
        totalElements: 0,
    },
    success: {
        comment: null,

    },

    error: {
        write: null,
        detail: null,
        comment: null,
        commentList: null,

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
    }),
    [DETAIL_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.detail.id = payload.id;
        draft.detail.title = payload.title;
        draft.detail.contents = payload.contents;
        draft.detail.writer = payload.writer;
        draft.detail.programmingType = payload.programmingType;
        draft.detail.status = payload.status;
        draft.detail.hit = payload.hit;
        draft.detail.createBoard = payload.createBoard;
        draft.error.detail = null;
    }),
    [DETAIL_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        draft.error.detail = error;
    }),
    [COMMENT_WRITE_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.success.comment = payload;
        draft.error.comment = null;
    }),
    [COMMENT_WRITE_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        draft.success.comment = null;
        draft.error.comment = error;
    }),
    [COMMENT_LIST_SUCCESS]: (state, { payload }) => produce(state, draft => {
        draft.comment.content = [...payload.content];
        draft.comment.totalPages = payload.totalPages;
        draft.comment.totalElements = payload.totalElements;
        draft.error.commentList = null;
    }),
    [COMMENT_LIST_FAILURE]: (state, { payload: error }) => produce(state, draft => {
        draft.error.commentList = error;
        draft.comment.content = [];
        draft.comment.totalPages = 0;
    }),



}, initialState)

export function* qnaSaga() {
    yield takeLatest(LIST, qnaListSaga);
    yield takeLatest(WRITE, qnaWriteSage);
    yield takeLatest(DETAIL, qnaDetailSaga);
    yield takeLatest(COMMENT_WRITE, commentWriteSaga);
    yield takeLatest(COMMENT_LIST, commentListSaga);
}