import styled from 'styled-components/native'
import { BaseInput } from 'co/style/form'
import { paddingHorizontal, fontSize } from 'co/style/constants'
import { themed } from 'co/style/colors'

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
	background-color: ${themed.mainAlt};
`

export const Input = styled(BaseInput).attrs({
	returnKeyType: 'search',
	autoCorrect: false,
	autoCapitalize: 'none',
	includeFontPadding: false,
	enablesReturnKeyAutomatically: false
})`
	font-size: ${fontSize.sub}px;
	flex: 1;
	padding-horizontal: ${paddingHorizontal}px;
	padding-vertical: 0;
	text-align-vertical: center;
`

export const Icon = styled.Image.attrs({
	fadeDuration:0
})`
	tint-color: ${themed.tintColor};
`

export const Button = styled.TouchableOpacity`
	width: ${height-horizontalGap}px;
	align-items: center;
	justify-content: center;
	z-index: 1;
`