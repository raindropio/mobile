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

const next = require('assets/images/next.png')

const Goto = ({
	icon,
	iconComponent,
	action,
	label, 
	subLabel, 
	last, 
	onPress
})=>(
	<TouchItem onPress={onPress}>
		<GotoView last={last}>
			{icon || iconComponent ? <GotoImageView>{icon ? <GotoIcon source={icon} /> : iconComponent}</GotoImageView> : null}
			<GotoTitleText>{label}</GotoTitleText>
			<GotoActionText>{subLabel}</GotoActionText>
			{action ? <GotoAction {...action} /> : <ActionImage source={next} />}
		</GotoView>
	</TouchItem>
)

const GotoAction = ({onPress, icon})=>(
	<ActionButton onPress={onPress}>
		<ActionImage source={icon} />
	</ActionButton>
)

export default Goto