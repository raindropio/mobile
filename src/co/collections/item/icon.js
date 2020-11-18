import React from 'react'
import FastImage from 'react-native-fast-image'
import _size from 'modules/appearance/size'
import Icon from 'co/icon'

const icons = {
	0: 'cloud',
	'-1': 'inbox',
	'-99': 'delete-bin',
	'-100': 'add',
	'default': 'folder'
}

let _styles = {}
function getStyle(size) {
	if (!_styles[size])
		_styles[size] = { width: (size || _size.height.icon)+4, height: (size || _size.height.icon)+4 }
	return _styles[size]
}

export default ({collectionId, src, size, color, ...original})=>{
	if (src)
		return (
			<FastImage 
				source={{ uri: src }}
				style={getStyle(size)}
				{...original} />
		)

	return (
		<Icon 
			name={icons[collectionId] || icons.default}
			variant='fill'
			size={size || _size.height.icon}
			color={color} />
	)
}