import { Platform } from 'react-native'

export const
	paddingHorizontal = 16,
	fontSize = {
		topBar: (Platform.OS == 'android' ? 21 : 18),
		title: 18,
		normal: 17,
		sub: 16,
		micro: 15
	}