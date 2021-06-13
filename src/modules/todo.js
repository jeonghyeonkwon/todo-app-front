import produce from 'immer';

import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'

import * as todoApi from '../lib/api/todo';

const INITIALIZE = 'todo/INITIALIZE';
export const initialize = createAction(INITIALIZE);

export const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes('todo/LIST');
export const fetchTodo = createAction(LIST, (userId, status, page) => ({ userId, status, page }));
export const fetchTodoSage = createRequestSaga(LIST, todoApi.fetchTodo);

export const [WRITE, WRITE_SUCCESS, WRITE_FAILURE] = createRequestActionTypes('todo/WRITE');
export const writeTodo = createAction(WRITE, (userId, form) => ({ userId, form }));
export const writeTodoSaga = createRequestSaga(WRITE, todoApi.writeTodo);

export const [ACHIEVE, ACHIEVE_SUCCESS, ACHIEVE_FAILURE] = createRequestActionTypes('todo/ACHIEVE');
export const achieveTodo = createAction(ACHIEVE, (userId, cardId) => ({ userId, cardId }));
export const achieveTodoSaga = createRequestSaga(ACHIEVE, todoApi.achieveTodo);


const initialState = {
    list: {
        content: [],
        totalPages: 0,
        totalElements: 0,
    },
    success: {
        write: null,
        achieve: null,
    },
    error: {
        list: null,
        write: null,
        achieve: null,
    }
}
export default handleActions(
    {
        [INITIALIZE]: (state) => initialState,
        [LIST_SUCCESS]: (state, { payload }) => produce(state, draft => {
            draft.list.content = payload.content;
            draft.list.totalPages = payload.totalPages;
            draft.list.totalElements = payload.totalElements;
            draft.error.list = null;
        }),
        [LIST_FAILURE]: (state, { payload: error }) => produce(state, draft => {
            draft.error.list = error;
            draft.list.content = [];
            draft.list.totalPages = 0;
            draft.list.totalElements = 0;
        }),
        [WRITE_SUCCESS]: (state, { payload }) => produce(state, draft => {
            draft.success.write = payload;
            draft.error.write = null;
        }),
        [WRITE_FAILURE]: (state, { payload: error }) => produce(state, draft => {
            draft.error.write = error;
            draft.success.write = null;
        }),
        [ACHIEVE_SUCCESS]: (state, { payload }) => produce(state, draft => {
            draft.success.achieve = payload;
            draft.error.achieve = null;
        }),
        [ACHIEVE_FAILURE]: (state, { payload: error }) => produce(state, draft => {
            draft.error.achieve = error;
            draft.success.achieve = null;
        }),

    }, initialState
)

export function* todoSaga() {
    yield takeLatest(LIST, fetchTodoSage);
    yield takeLatest(ACHIEVE, achieveTodoSaga);
    yield takeLatest(WRITE, writeTodoSaga)

}

