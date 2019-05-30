import { put, takeEvery } from 'redux-saga/effects'

import {
	USER_NOT_AUTHORIZED
} from '../constants/user'

//Requests
const common = function* common () {
	yield takeEvery(action => action.error, checkAuth)
}
export default common

function* checkAuth(e) {
	console.log('redux:', e)

	if (e.message=='notAuthorized'){
		yield put({type: 'RESET'})
		yield put({type: USER_NOT_AUTHORIZED})
	}
}