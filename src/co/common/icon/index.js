import React from 'react'
import { Image } from 'react-native'
import { styles } from './style'
import Icon from 'co/icon'

const icons = {
	0: 'cloud',
	'-1': 'inbox',
	'-99': 'delete-bin',
	'-100': 'add',
	'default': 'folder'
}

export default ({collectionId, src, size, ...original})=>{
	if (src)
		return (
			<Image 
				source={src ? { uri: src } : undefined}
				style={styles[size] || styles.default}
				{...original} />
		)

	return (
		<Icon 
			name={icons[collectionId] || icons.default}
			variant='fill'
			size={(styles[size] || styles.default).width}
			style={styles[size] || styles.default} />
	)
}