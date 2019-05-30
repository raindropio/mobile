import { call, put, takeLatest } from 'redux-saga/effects'
import Api from '../modules/api'
import {
	USER_LOAD_REQ, USER_LOAD_SUCCESS, USER_LOAD_ERROR,
	USER_REFRESH_REQ,
	USER_LOGOUT_REQ,
	USER_NOT_AUTHORIZED,
	USER_LOGIN_PASSWORD,
	USER_REGISTER_PASSWORD,
	USER_LOGIN_NATIVE
} from '../constants/user'

//Requests
export default function* () {
	yield takeLatest([
		USER_LOAD_REQ,
		USER_REFRESH_REQ
	], loadUser)

	yield takeLatest(USER_LOGIN_PASSWORD, loginWithPassword)
	yield takeLatest(USER_REGISTER_PASSWORD, registerWithPassword)
	yield takeLatest(USER_LOGIN_NATIVE, loginNative)

	yield takeLatest(USER_LOGOUT_REQ, logout)
}

function* loadUser({ignore=false, reset=true, way, onSuccess, onFail}) {
	if (ignore)
		return;

	try {
		if (reset)
			yield put({type: 'RESET'})
		
		const {user, result} = yield call(Api.get, 'user');

		if (!result)
			throw new Error('cant load user')

		yield put({type: USER_LOAD_SUCCESS, user: user, way, onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way, onFail});
	}
}

function* loginWithPassword({email, password, onSuccess, onFail}) {
	try {
		const {result} = yield call(Api.post, 'auth/login', {email, password});
		if (!result)
			throw new Error('email/password incorrect')

		yield put({type: USER_REFRESH_REQ, way: 'login', onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'login', onFail});
	}
}

function* registerWithPassword({fullName, email, password, onSuccess, onFail}) {
	try {
		const {result, error} = yield call(Api.post, 'user', {fullName, email:email||'0', password});
		if (!result)
			throw new Error(error)

		const loginTry = yield call(Api.post, 'auth/login', {email, password});
		if (!loginTry.result)
			throw new Error('undefined')

		yield put({type: USER_REFRESH_REQ, way: 'register', onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'register', onFail});
	}
}

function* loginNative({params, onSuccess, onFail}) {
	try {
		const {auth} = yield call(Api.get, '/auth/'+params.provider+'/native'+params.token);
		if (!auth)
			throw new Error('token incorrect')

		yield put({type: USER_REFRESH_REQ, way: 'native', onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'native', onFail});
	}
}

function* logout({ignore=false}) {
	if (ignore)
		return;

	try {
		yield call(Api.get, '/auth/logout');
		yield put({type: 'RESET'});
		yield put({type: USER_NOT_AUTHORIZED});
	} catch ({message}) {
		console.log(message)
	}
}