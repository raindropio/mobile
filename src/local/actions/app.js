import {
	APP_SET_SWIAPEABLES,
	APP_SET_THEME,
	APP_RESTART,
	APP_SET_LAST_TAB,
	APP_DISABLE_SCROLL,
	APP_SET_BROWSER
} from '../constants'

export const setTheme = (name)=>({
	type: APP_SET_THEME,
	name
})

export const restart = ()=>({
	type: APP_RESTART
})

export const setLastTab = (value)=>({
	type: APP_SET_LAST_TAB,
	value
})

export const setSwipeables = (value)=>({
	type: APP_SET_SWIAPEABLES,
	value
})

export const disableScroll = (value)=>({
	type: APP_DISABLE_SCROLL,
	value
})

export const setBrowser = (id)=>({
	type: APP_SET_BROWSER,
	id
})