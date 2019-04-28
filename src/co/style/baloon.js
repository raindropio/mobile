import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { fontSize } from 'co/style/constants'
import {themed} from 'co/style/colors'

export const 
	height = 36,
	gap = 8,
	paddingVertical = 10

export const CurrentItem = styled.View`
	margin-horizontal: ${gap/2}px;
	flex-direction: row;
	height: ${height}px;
	background-color: ${themed.tintColor};
	align-items: center;
	border-radius: 10px;
	padding-horizontal: 10px;
`

export const CurrentText = styled.Text`
	font-size: ${fontSize.sub}px;
	color: ${themed.main};
`

export const CurrentClearImage = styled.Image`
	tint-color: ${themed.main};
	margin-right: -3px;
	margin-left: 4px;
`

//Suggested
export const SuggestedItem = styled(CurrentItem)`
	background-color: ${themed.main};
	border-width: ${StyleSheet.hairlineWidth}px;
	border-color: ${themed.inverted}15;
`

export const SuggestedText = styled(CurrentText)`
	color: ${themed.inverted};
`