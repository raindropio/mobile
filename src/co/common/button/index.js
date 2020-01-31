import React from 'react'

import {
	BaseButton,
	ButtonText,
	ButtonImage,
	ButtonTextWhiteBold,
	ButtonWithBg
} from './style'

export const ButtonLink = ({children, danger, white, disabled, onPress, bodyStyle})=>(
	<BaseButton disabled={disabled} onPress={disabled ? undefined : onPress} style={bodyStyle}>
		<ButtonText danger={danger} white={white}>{children}</ButtonText>
	</BaseButton>
)

export const ButtonIcon = ({source, danger, white, onPress, bodyStyle})=>(
	<BaseButton onPress={onPress} style={bodyStyle}>
		<ButtonImage danger={danger} white={white} source={source} />
	</BaseButton>
)

export const ButtonAction = ({children, disabled, onPress, bodyStyle})=>(
	<ButtonWithBg disabled={disabled} onPress={disabled ? undefined : onPress} style={bodyStyle}>
		<ButtonTextWhiteBold>{children}</ButtonTextWhiteBold>
	</ButtonWithBg>
)