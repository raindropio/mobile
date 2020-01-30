import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { paddingHorizontal, fontSize } from 'co/style/constants'
import colors, {themed} from 'co/style/colors'
import { baseFormElementStyle } from 'co/style/form'

export const 
	paddingRight = paddingHorizontal - 6,
	height = 46;

export const ActionButton = styled.TouchableOpacity`
	padding-horizontal: ${paddingHorizontal}px;
	margin-horizontal: ${paddingRight*-1}px;
	height: ${height}px;
	justify-content: center;
`

export const ActionImage = styled.Image.attrs({
	fadeDuration:0
})`
	tint-color: ${({theme})=>theme.dark===true?'#ffffff':colors.iconGray};
`

//Goto
export const GotoView = styled.View`
	${({theme})=>baseFormElementStyle(theme)}
	height: ${height}px;
	padding-right: ${paddingRight}px;
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
	color: ${themed.inverted};
	font-size: ${fontSize.normal}px;
	padding-right: ${paddingRight}px;
`

export const GotoActionText = styled.Text.attrs({
	numberOfLines: 1,
	ellipsizeMode: 'head'
})`
	max-width: 40%;
	font-size: ${fontSize.micro}px;
	color: ${themed.invertedMedium};
	padding-right: ${paddingRight}px;
`

export const GotoImageView = styled.View`
	margin-right: ${paddingHorizontal - 2}px;
`

export const GotoIcon = styled.Image`
	tint-color: ${themed.tintColor};
`