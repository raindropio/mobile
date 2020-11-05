import styled from 'styled-components/native'
import { BaseInput } from 'co/style/form'
import { BorderlessButton } from 'react-native-gesture-handler'

const horizontalGap = 6;
export const height = 48;

export const Wrap = styled.View`
	align-items: center;
	height: ${height}px;
	padding: ${horizontalGap}px 12px;
`

export const Form = styled.View`
	flex: 1;
	flex-direction: row;
	border-radius: ${height}px;
	background-color: ${({theme})=>theme.color.border};
`

export const Input = styled(BaseInput).attrs({
	returnKeyType: 'search',
	autoCorrect: false,
	autoCapitalize: 'none',
	includeFontPadding: false,
	enablesReturnKeyAutomatically: false
})`
	font-size: ${({theme})=>theme.fontSize.secondary}px;
	flex: 1;
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
	padding-vertical: 0;
	text-align-vertical: center;
`

export const Icon = styled.Image.attrs({
	fadeDuration:0
})`
	tint-color: ${({theme})=>theme.color.accent}
`

export const Button = styled(BorderlessButton)`
	width: ${height-horizontalGap}px;
	align-items: center;
	justify-content: center;
	z-index: 1;
`