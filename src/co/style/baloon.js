import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const 
	height = 36,
	gap = 8,
	paddingVertical = 10

export const CurrentItem = styled.View`
	margin-horizontal: ${gap/2}px;
	flex-direction: row;
	height: ${height}px;
	background-color: ${({theme})=>theme.color.accent};
	align-items: center;
	border-radius: 10px;
	padding-horizontal: 10px;
`

export const CurrentText = styled.Text`
	font-size: ${({theme})=>theme.fontSize.secondary}px;
	color: ${({theme})=>theme.background.regular};
`

export const CurrentClearImage = styled.Image`
	tint-color: ${({theme})=>theme.background.regular};
	margin-right: -3px;
	margin-left: 4px;
`

//Suggested
export const SuggestedItem = styled(CurrentItem)`
	background-color: ${({theme})=>theme.background.regular};
	border-width: ${StyleSheet.hairlineWidth}px;
	border-color: ${({theme})=>theme.color.border};
`

export const SuggestedText = styled(CurrentText)`
	color: ${({theme})=>theme.text.regular};
`