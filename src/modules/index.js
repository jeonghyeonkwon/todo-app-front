import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth'
import user, { userSaga } from './user'
import register, { registerSaga } from './register';
import loading from './loading';
const rootReducer = combineReducers({
    auth, loading, user, register,
});
export function* rootSaga() {
    yield all([authSaga(), userSaga(), registerSaga()])
}
export default rootReducer;