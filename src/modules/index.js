import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth'
import user, { userSaga } from './user'
import qna, { qnaSaga } from './qna'
import study, { studySaga } from './study'
import register, { registerSaga } from './register';
import todo, { todoSaga } from './todo';
import common, { commonSaga } from './common';
import loading from './loading';
const rootReducer = combineReducers({
    auth, loading, user, register, qna, study, common, todo
});
export function* rootSaga() {
    yield all([authSaga(), userSaga(), registerSaga(), qnaSaga(), studySaga(), commonSaga(), todoSaga()])
}
export default rootReducer;