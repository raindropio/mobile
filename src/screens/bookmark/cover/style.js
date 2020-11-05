import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

//Covers
export const coverHeight = 70

export const CoverTap = styled(RectButton)``

export const CoverView = styled.View`
	width: 106px;
	height: ${coverHeight}px;
	margin: ${({theme})=>theme.padding.small}px;
	border-radius: 4px;
	${({active, theme})=>active?`
		border-width: 2px;
		border-color: ${theme.color.accent};
		overflow: hidden;
	`:''}
`

export const CoversView = styled.FlatList.attrs({
	keyboardDismissMode: 'on-drag',
	keyboardShouldPersistTaps: 'always',
	directionalLockEnabled: true
})`
	padding-horizontal: ${({theme})=>theme.padding.small}px;
	flex: 1;
`

export const CoverCheckView = styled.View`
	position: absolute;
	right: 6px;
	top: 6px;
	z-index:1;
	padding: ${StyleSheet.hairlineWidth}px;
	border-radius: 24px;
	background-color: ${({theme})=>theme.background.regular};
`

export const CoverCheck = styled.Image`
	tint-color: ${({theme})=>theme.color.accent};
`


export const CoverScreenshotView = styled(CoverView)`
	border-width: ${StyleSheet.hairlineWidth}px;
	border-color: ${({theme})=>theme.text.disabled};
	align-items: center;
	justify-content: center;
`

export const CoverScreenshotText = styled.Text`
	font-size: ${({theme})=>theme.fontSize.secondary}px;
	color: ${({theme})=>theme.color.accent};
	text-align: center;
`