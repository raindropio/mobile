import { LayoutAnimation } from 'react-native'
import { isExtensionCached } from 'modules/native'

export const fastFade = async()=>{
	if (await isExtensionCached()) return null;

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
	if (await isExtensionCached()) return null;

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