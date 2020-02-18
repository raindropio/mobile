import React from 'react'
import { Image } from 'react-native'
import { styles, DefaultIconImage } from './style'

const icons = {
	0: require('assets/images/all.png'),
	'-1': require('assets/images/inbox.png'),
	'-99': require('assets/images/trash.png'),
	'default': require('assets/images/collection.png')
}

export default ({collectionId, src, size, ...original})=>
	src ? (
		<Image 
			source={src ? { uri: src } : undefined}
			style={styles[size] || styles.default}
			{...original} />
	) : (
		<DefaultIconImage
			source={icons[collectionId] || icons.default}
			style={styles[size] || styles.default}
			{...original} />
	)