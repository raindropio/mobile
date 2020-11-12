import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { baseFormElementStyle } from 'co/style/form'

export const height = 46;

export const ActionButton = styled(BorderlessButton)`
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
	margin-horizontal: ${({theme})=>theme.padding.medium*-1}px;
	height: ${height}px;
	justify-content: center;
`

export const ImageView = styled.View`
	margin-right: ${({theme})=>theme.padding.medium - 2}px;
`

//Goto
export const GotoTap = styled(RectButton).attrs(({theme})=>({
	underlayColor: theme.text.regular
}))``

export const GotoView = styled.View`
	${({theme})=>baseFormElementStyle(theme)}
	height: ${height}px;
	padding-right: ${({theme})=>theme.padding.small}px;
	flex-direction: row;
	align-items: center;
	${({last})=>!last ? `
		border-bottom-width: ${StyleSheet.hairlineWidth}px;
	`:''}
`

export const GotoTitleText = styled.Text.attrs({
	numberOfLines: 1,
	ellipsizeMode: 'tail'
})`
	flex: 1;
	color: ${({theme})=>theme.text.regular};
	font-size: ${({theme})=>theme.fontSize.primary}px;
	padding-right: ${({theme})=>theme.padding.small}px;
`

export const GotoActionText = styled.Text.attrs({
	numberOfLines: 1,
	ellipsizeMode: 'head'
})`
	max-width: 40%;
	font-size: ${({theme})=>theme.fontSize.tertiary}px;
	color: ${({theme})=>theme.text.secondary};
	padding-right: ${({theme})=>theme.padding.small}px;
`