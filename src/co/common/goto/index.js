import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import {
	styles,
	GotoView,
	GotoIcon,
	GotoTitleText,
	GotoActionText,
	ActionImage
} from './style'
import TouchItem from 'co/common/touchItem'

const nextImage = require('assets/images/next.png')

const Goto = ({
	icon,
	iconComponent,
	action=nextImage,
	label, 
	subLabel, 
	last, 
	onPress,
	onActionPress
})=>{
	let actionIcon
	if (action)
		actionIcon = <ActionImage source={action} />

	return (
		<TouchItem onPress={onPress}>
			<GotoView last={last}>
				{icon || iconComponent ? <View style={styles.imageView}>{icon ? <GotoIcon source={icon} /> : iconComponent}</View> : null}
				<GotoTitleText>{label}</GotoTitleText>
				<GotoActionText>{subLabel}</GotoActionText>
				{onActionPress ? <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>{actionIcon}</TouchableOpacity> : actionIcon}
			</GotoView>
		</TouchItem>
	)
}

export default Goto