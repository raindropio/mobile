import {
	APP_SET_BROWSER,
	APP_SET_APPEARANCE
} from '../constants'

export const setAppearance = (value)=>({
	type: APP_SET_APPEARANCE,
	value
})

export const setBrowser = (id)=>({
	type: APP_SET_BROWSER,
	id
})