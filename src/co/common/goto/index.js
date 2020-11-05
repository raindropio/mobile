import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import {
	ImageView,
	GotoView,
	GotoIcon,
	GotoTitleText,
	GotoActionText,
	ActionImage,
	ActionButton
} from './style'

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
		<RectButton onPress={onPress}>
			<GotoView last={last}>
				{icon || iconComponent ? <ImageView>{icon ? <GotoIcon source={icon} /> : iconComponent}</ImageView> : null}
				<GotoTitleText>{label}</GotoTitleText>
				<GotoActionText>{subLabel}</GotoActionText>
				{onActionPress ? <ActionButton onPress={onActionPress}>{actionIcon}</ActionButton> : actionIcon}
			</GotoView>
		</RectButton>
	)
}

export default Goto