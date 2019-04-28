import styled from 'styled-components/native'
import { topBarHeight } from 'modules/native'

import { BaseInput } from 'co/style/form'
import { paddingHorizontal } from 'co/style/constants'
import { themed } from 'co/style/colors'

const buttonWidth = 48;
const height = topBarHeight-14;

export const Wrap = styled.View`
	flex-direction: row;
	height: ${height}px;
	margin: 7px 12px;
	border-radius: ${height}px;
	background-color: ${themed.mainAlt};
`

export const Input = styled(BaseInput).attrs({
	returnKeyType: 'search',
	autoCorrect: false,
	autoCapitalize: 'none',
	includeFontPadding: false
})`
	flex: 1;
	padding-top: 12px;
	padding-horizontal: ${paddingHorizontal}px;
	text-align-vertical: center;
`

export const Icon = styled.Image.attrs({
	fadeDuration:0
})`
	tint-color: ${themed.tintColor};
`

export const Button = styled.TouchableOpacity`
	width: ${buttonWidth}px;
	align-items: center;
	justify-content: center;
	z-index: 1;
`