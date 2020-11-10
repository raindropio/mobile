import React from 'react'
import Icon from 'co/icon'
import {
	BaseButton,
	ButtonText,
	ButtonTextWhiteBold,
	ButtonWithBg
} from './style'

export const ButtonLink = ({children, danger, white, disabled, onPress, bodyStyle})=>(
	<BaseButton disabled={disabled} onPress={disabled ? undefined : onPress} style={bodyStyle}>
		<ButtonText danger={danger} white={white}>{children}</ButtonText>
	</BaseButton>
)

export const ButtonIcon = ({ name, color, variant, onPress, bodyStyle})=>(
	<BaseButton onPress={onPress} style={bodyStyle}>
		<Icon 
			name={name}
			color={color}
			variant={variant} />
	</BaseButton>
)

export const ButtonAction = ({children, disabled, onPress, bodyStyle})=>(
	<ButtonWithBg disabled={disabled} onPress={disabled ? undefined : onPress} style={bodyStyle}>
		<ButtonTextWhiteBold>{children}</ButtonTextWhiteBold>
	</ButtonWithBg>
)