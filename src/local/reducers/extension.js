import _ from 'lodash-es'
import Immutable from 'seamless-immutable'
import { REHYDRATE } from 'redux-persist/src/constants'
import { EXTENSION_COLLECTIONS_SEARCH_FOCUS } from '../constants'

export const initialState = Immutable({
	collectionSearchFocus: true
})

export default function(state=initialState, action) {switch (action.type) {
	case EXTENSION_COLLECTIONS_SEARCH_FOCUS:
		return state.set('collectionSearchFocus', action.focus ? true : false)

	case REHYDRATE:{
		const incoming = action.payload && action.payload.local||{}

		return state.merge(_.pick(incoming, Object.keys(initialState)))
	}
}}