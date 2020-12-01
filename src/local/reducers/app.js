import _ from 'lodash-es'
import { REHYDRATE } from 'redux-persist/src/constants'
import { APP_SET_BROWSER, APP_SET_APPEARANCE } from '../constants'

export default function(state, action) {switch (action.type) {
	//Settings
	case APP_SET_BROWSER:
		return state.set('browser', action.id)

	case APP_SET_APPEARANCE:
		return state.set('appearance', action.value)

	case REHYDRATE:{
		const incoming = action.payload && action.payload.local||{}

		_.forEach(incoming, (val,key)=>{
			switch(key){
				case 'browser': state = state.set('browser', val); break;
				case 'appearance': state = state.set('appearance', val); break;
			}
		})

		return state
	}
}}