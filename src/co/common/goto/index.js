import React from 'react'
import {
	GotoView,
	GotoIcon,
	GotoImageView,
	GotoTitleText,
	GotoActionText,
	ActionButton,
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
				{icon || iconComponent ? <GotoImageView>{icon ? <GotoIcon source={icon} /> : iconComponent}</GotoImageView> : null}
				<GotoTitleText>{label}</GotoTitleText>
				<GotoActionText>{subLabel}</GotoActionText>
				{onActionPress ? <ActionButton onPress={onActionPress}>{actionIcon}</ActionButton> : actionIcon}
			</GotoView>
		</TouchItem>
	)
}

export default Goto