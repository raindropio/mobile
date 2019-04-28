import { 
	ICONS_LOAD_REQ, ICONS_LOAD_SUCCESS, ICONS_LOAD_ERROR
} from '../constants/icons'

import Immutable from 'seamless-immutable'
import { normalizeReq, blankItems } from '../helpers/icons'

export default (state = initialState, action)=>{switch (action.type) {
	//Load
	case ICONS_LOAD_REQ:{
		if (state.status!='idle'){
			action.ignore = true
			return state;
		}
		
		return state
				.set('status', 'loading')
	}

	case ICONS_LOAD_SUCCESS:{
		return state
				.set('status', 'loaded')
				.set('items', normalizeReq(action.items, action.pro, action.path))
	}

	case ICONS_LOAD_ERROR:{
		return state
				.set('status', 'error')
				.set('items', blankItems)
	}

	case 'RESET':{
		return initialState
	}

	default:
		return state;
}}

const initialState = Immutable({
	status: 'idle', //idle/loading/error/loaded
	items: blankItems
})