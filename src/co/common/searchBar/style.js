import styled from 'styled-components/native'
import { BaseInput } from 'co/style/form'
import { BorderlessButton } from 'react-native-gesture-handler'

export const height = 38;

export const Wrap = styled.View`
	width: 100%;
	padding: ${({theme})=>theme.padding.small}px ${({theme})=>theme.padding.medium}px;
`

export const Form = styled.View`
	height: ${height}px;
	flex-direction: row;
	border-radius: ${height/2}px;
	background-color: ${({theme})=>theme.background.disabled};
`

export const Input = styled(BaseInput).attrs(({ returnKeyType })=>({
	returnKeyType: returnKeyType || 'search',
	autoCorrect: false,
	autoCapitalize: 'none',
	includeFontPadding: false,
	enablesReturnKeyAutomatically: false
}))`
	font-size: ${({theme})=>theme.fontSize.secondary}px;
	flex: 1;
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
	padding-vertical: 0;
	text-align-vertical: center;
`

export const Button = styled(BorderlessButton)`
	width: ${height}px;
	align-items: center;
	justify-content: center;
	z-index: 1;
`

export const Loading = styled.ActivityIndicator.attrs(({theme})=>({
	color: theme.text.secondary
}))`
	margin-horizontal: ${({theme})=>theme.padding.small}px;
`