import _ from 'lodash-es'
import { 
	USER_LOAD_REQ, USER_LOAD_SUCCESS, USER_LOAD_ERROR,
	USER_UPDATE_SUCCESS,
	USER_NOT_AUTHORIZED,
	USER_REFRESH_REQ,
	USER_LOGIN_PASSWORD,
	USER_REGISTER_PASSWORD,
	USER_LOGIN_NATIVE
} from '../constants/user'

import {
	COLLECTIONS_LOAD_SUCCESS
} from '../constants/collections'

import Immutable from 'seamless-immutable'
import { 
	normalizeUser,
	blankCurrent
} from '../helpers/user'

export default (state = initialState, action)=>{switch (action.type) {
	//do not rehydrate!

	//Load
	case USER_LOAD_REQ:{
		if (state.status.authorized!='yes' && !state.fromCache){
			action.ignore = true
			return state;
		}
		
		return setSpecificStatus(state)
	}

	//Refresh
	case USER_REFRESH_REQ:{
		return setSpecificStatus(state, action.way, 'loading')
	}

	//Login
	case USER_LOGIN_PASSWORD:{
		return setSpecificStatus(state, 'login', 'loading')
	}

	//Register
	case USER_REGISTER_PASSWORD:{
		return setSpecificStatus(state, 'register', 'loading')
	}

	//Native
	case USER_LOGIN_NATIVE:{
		return setSpecificStatus(state, 'native', 'loading')
	}

	case USER_LOAD_SUCCESS:
	case USER_UPDATE_SUCCESS:
	case COLLECTIONS_LOAD_SUCCESS:{
		if (typeof action.onSuccess == 'function')
			action.onSuccess()

		return state
			.set('status', initialState.status.set('authorized', 'yes'))
			.set('current', normalizeUser(action.user))
	}

	case USER_LOAD_ERROR:{
		if (typeof action.onFail == 'function')
			action.onFail()

		if (action.way)
			state = state.setIn(['errorReason', action.way], action.error)

		return setSpecificStatus(state, action.way, 'error')
			.set('current', blankCurrent)
	}

	case USER_NOT_AUTHORIZED:{
		return state
			.set('status', initialState.status.set('authorized', 'no'))
			.set('current', blankCurrent)
	}

	default:{
		return state;
	}
}}

const setSpecificStatus = (state, way='', val='idle')=>{
	return state
		.setIn(['status', 'login'], 	way == 'login' ? val : 'idle')
		.setIn(['status', 'register'], 	way == 'register' ? val : 'idle')
		.setIn(['status', 'native'], 	way == 'native' ? val : 'idle')
}

const initialState = Immutable({
	fromCache: false,
	status: {
		authorized: 'idle', //idle, yes, no
		login: 'idle', //idle, loading, error
		register: 'idle',
		native: 'idle'
	},
	errorReason: {
		login:'',
		register:'',
		native:''
	},
	current: blankCurrent
})