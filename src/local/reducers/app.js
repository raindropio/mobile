import _ from 'lodash-es'
import { REHYDRATE } from 'redux-persist/src/constants'

import {
	APP_SET_SWIAPEABLES,
	APP_SET_THEME,
	APP_SET_LAST_TAB,
	APP_DISABLE_SCROLL,
	APP_SET_BROWSER
} from '../constants'

export default (state, action)=>{switch (action.type) {
	//Settings
	case APP_SET_THEME:
		return setTheme(state, action.name)

	case APP_SET_LAST_TAB:
		return state.set('lastTabIndex', parseInt(action.value))

	//Swipes
	case APP_SET_SWIAPEABLES:
		return state.set('swipeables', action.value)

	case APP_DISABLE_SCROLL:
		return state.set('disableScroll', action.value)

	case APP_SET_BROWSER:
		return state.set('browser', action.id)

	case REHYDRATE:{
		const incoming = action.payload && action.payload.local||{}

		_.forEach(incoming, (val,key)=>{
			switch(key){
				case 'theme': state = setTheme(state, val); break;
				case 'lastTabIndex': state = state.set('lastTabIndex', val); break;
				case 'drawerSpaceId': state = state.set('drawerSpaceId', val); break;
				case 'browser': state = state.set('browser', val); break;
			}
		})

		return state
	}
}}

const setTheme = (state, name)=>{
	return state.set('theme', name)
}