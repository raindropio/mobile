import _ from 'lodash-es'
import {REHYDRATE} from 'redux-persist/src/constants'

import { 
	CONFIG_SET_LASTCOLLECTION
} from '../constants/config'

import { 
	COLLECTION_CHANGE_VIEW
} from '../constants/collections'

import {
	SPACE_LOAD_SUCCESS,
	BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS
} from '../constants/bookmarks'

import Immutable from 'seamless-immutable'

export default (state = initialState, action)=>{switch (action.type) {
	case REHYDRATE:{
		const incoming = action.payload && action.payload.config||{}

		_.forEach(incoming, (val,key)=>{
			switch(key){
				case 'lastCollection': state = setLastCollection(state, val); break;
				case 'defaultCollectionView': state = setDefaultCollectionView(state, val); break;
			}
		})

		return state
	}

	//case SPACE_LOAD_SUCCESS:
	case CONFIG_SET_LASTCOLLECTION:
	case BOOKMARK_CREATE_SUCCESS:
	case BOOKMARK_UPDATE_SUCCESS:{
		return setLastCollection(state, action.spaceId)
	}

	case COLLECTION_CHANGE_VIEW:{
		var obj={}; obj[action._id] = action.view
		return setDefaultCollectionView(state, obj)
	}

	case 'RESET':{
		return initialState
	}

	default:
		return state
}}

const setLastCollection = (state, spaceId)=>{
	const cleanLastCollection = (spaceId)=>{
		var result = parseInt(spaceId||0)
		return result
	}

	//if (cleanLastCollection(spaceId))
		return state.set('lastCollection', cleanLastCollection(spaceId))
	//return state
}

const setDefaultCollectionView = (state, obj)=>{
	_.forEach(obj, (view,_id)=>{
		if (_id<=0)
			state = state.setIn(['defaultCollectionView', _id], view)
	})

	return state
}

const initialState = Immutable({
	lastCollection: 0,
	defaultCollectionView: {}
})