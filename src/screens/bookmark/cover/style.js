import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { paddingHorizontal, fontSize } from 'co/style/constants'
import { themed } from 'co/style/colors'
import TouchItem from 'co/common/touchItem'

//Covers
export const coverHeight = 70

export const CoverTap = styled(TouchItem)``

export const CoverView = styled.View`
	width: 106px;
	height: ${coverHeight}px;
	margin: ${paddingHorizontal/2}px;
	border-radius: 4px;
	${({active, theme})=>active?`
		border-width: 2px;
		border-color: ${themed.tintColor({theme})};
		overflow: hidden;
	`:''}
`

export const CoversView = styled.FlatList.attrs({
	keyboardDismissMode: 'on-drag',
	keyboardShouldPersistTaps: 'always',
	directionalLockEnabled: true
})`
	padding-horizontal: ${paddingHorizontal/2}px;
	flex: 1;
`

export const CoverCheckView = styled.View`
	position: absolute;
	right: 6px;
	top: 6px;
	z-index:1;
	padding: ${StyleSheet.hairlineWidth}px;
	border-radius: 24px;
	background-color: ${themed.main};
`

export const CoverCheck = styled.Image`
	tint-color: ${themed.tintColor};
`


export const CoverScreenshotView = styled(CoverView)`
	border-width: ${StyleSheet.hairlineWidth}px;
	border-color: ${themed.invertedLight};
	align-items: center;
	justify-content: center;
`

export const CoverScreenshotText = styled.Text`
	font-size: ${fontSize.sub}px;
	color: ${themed.tintColor};
	text-align: center;
`