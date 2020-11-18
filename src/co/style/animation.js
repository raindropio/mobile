import { LayoutAnimation } from 'react-native'

export const fastFade = async()=>{
	LayoutAnimation.configureNext({
		duration: 150,
		create: {
			type: LayoutAnimation.Types.easeInEaseOut,
			property: LayoutAnimation.Properties.opacity,
		},
		update: {
			type: LayoutAnimation.Types.easeInEaseOut,
			property: LayoutAnimation.Properties.opacity,
		},
	})
}

export const mediumFade = async()=>{
	LayoutAnimation.configureNext({
		duration: 300,
		create: {
			type: LayoutAnimation.Types.easeInEaseOut,
			property: LayoutAnimation.Properties.opacity,
		},
		update: {
			type: LayoutAnimation.Types.easeInEaseOut,
			property: LayoutAnimation.Properties.opacity,
		},
	})
}

export const easeInOut = ()=>{
	LayoutAnimation.easeInEaseOut()
}