import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'co/icon'
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

	action='arrow-right-s',
	label, 
	subLabel,
	last, 
	onPress,
	onActionPress
})=>{
	let actionIcon
	if (action)
		actionIcon = <Icon name={action} />

	let iconItself
	switch(typeof icon) {
		case 'string': iconItself = <Icon name={icon} variant={variant} color={color} />; break
		case 'object': iconItself = icon; break
	}

	return (
		<RectButton onPress={onPress}>
			<GotoView last={last}>
				{iconItself ? <ImageView>{iconItself}</ImageView> : null}
				<GotoTitleText>{label}</GotoTitleText>
				<GotoActionText>{subLabel}</GotoActionText>
				{onActionPress ? <ActionButton onPress={onActionPress}>{actionIcon}</ActionButton> : actionIcon}
			</GotoView>
		</RectButton>
	)
}

export default Goto