import { Platform } from 'react-native'

export const fontWeightMedium = ()=>{
	return Platform.OS === 'android' ? 
		'font-family: sans-serif-medium;' : 
		'font-weight: 500;'
}