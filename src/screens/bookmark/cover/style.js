import styled from 'styled-components/native'
import { StyleSheet, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

//Covers
export const coverHeight = 70

export const CoverTap = styled(TouchableOpacity)``

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

export const Wrap = styled(SafeAreaView).attrs({
    edges: ['right', 'left']
})`
    flex: 1;
`

export const CoversView = styled(FlatList).attrs({
	keyboardDismissMode: 'on-drag',
	keyboardShouldPersistTaps: 'always',
	directionalLockEnabled: true,
	removeClippedSubviews: false //buggy on old androids
})`
	padding: ${({theme})=>theme.padding.small}px;
	flex: 1;
`

export const CoverScreenshotView = styled(CoverView)`
	border-width: ${StyleSheet.hairlineWidth}px;
	border-color: ${({theme})=>theme.color.border};
	align-items: center;
	justify-content: center;
`

export const CoverScreenshotText = styled.Text`
	font-size: ${({theme})=>theme.fontSize.secondary}px;
	color: ${({theme})=>theme.color.accent};
	text-align: center;
`