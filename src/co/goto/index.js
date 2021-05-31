import React from 'react'
import Icon from 'co/icon'
import { Pressable } from 'co/native'
import {
	ImageView,
	GotoView,
	GotoTitleText,
	GotoActionText,
	ActionButton
} from './style'

const Goto = ({
	icon,
	variant,
	color,
	ellipsizeMode='tail',

	action='arrow-right-s',
	actionColor,
	actionVariant,
	label, 
	subLabel,
	last, 
	onPress,
	onActionPress
})=>{
	let actionIcon
	if (action)
		actionIcon = <Icon name={action} variant={actionVariant} color={actionColor} />

	let iconItself
	switch(typeof icon) {
		case 'string': iconItself = <Icon name={icon} variant={variant} color={color} />; break
		case 'object': iconItself = icon; break
	}

	return (
		<Pressable onPress={onPress}>
			<GotoView last={last}>
				{iconItself ? <ImageView>{iconItself}</ImageView> : null}
				<GotoTitleText ellipsizeMode={ellipsizeMode}>{label}</GotoTitleText>
				<GotoActionText>{subLabel}</GotoActionText>
				{onActionPress ? <ActionButton onPress={onActionPress}>{actionIcon}</ActionButton> : actionIcon}
			</GotoView>
		</Pressable>
	)
}

export default Goto