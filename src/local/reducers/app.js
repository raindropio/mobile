import _ from 'lodash-es'
import Immutable from 'seamless-immutable'
import { REHYDRATE } from 'redux-persist/src/constants'
import { APP_SET_BROWSER, APP_SET_APPEARANCE } from '../constants'

export const initialState = Immutable({
	browser: 'internal',
	appearance: ''
})

export default function(state=initialState, action) {switch (action.type) {
	case APP_SET_BROWSER:
		return state.set('browser', action.id)

	case APP_SET_APPEARANCE:
		return state.set('appearance', action.value)

	case REHYDRATE:{
		const incoming = action.payload && action.payload.local||{}

		return state.merge(_.pick(incoming, Object.keys(initialState)))
	}
}}