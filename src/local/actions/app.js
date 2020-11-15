import {
	APP_SET_LAST_TAB,
	APP_SET_BROWSER
} from '../constants'

export const setLastTab = (value)=>({
	type: APP_SET_LAST_TAB,
	value
})

export const setBrowser = (id)=>({
	type: APP_SET_BROWSER,
	id
})