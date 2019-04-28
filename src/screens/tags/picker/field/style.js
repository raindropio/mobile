import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { fontSize, paddingHorizontal } from 'co/style/constants'
import { fontWeightMedium } from 'co/style/font'
import { BaseInput, baseFormElementStyle, formElementHeight } from 'co/style/form'
import { themed } from 'co/style/colors'

const tokenItemGap = 4;
export const Tokens = {
	Wrap: styled.View`
		${baseFormElementStyle}
		height: auto;
		flex-direction: row;
		flex-wrap: wrap;
		padding-vertical: ${tokenItemGap}px;
		padding-left: ${paddingHorizontal - tokenItemGap}px;
		margin-left: 0;
		background-color: ${themed.main};
		border-bottom-width: ${StyleSheet.hairlineWidth}px;
		border-bottom-color: ${themed.invertedLight};
	`,
	Item: {
		Tap: styled.TouchableOpacity``,
		Content: styled.View`
			flex-direction: row;
			align-items: center;
			justify-content: center;
			height: ${formElementHeight - tokenItemGap*4}px;
			padding-horizontal: ${tokenItemGap}px;
			margin-vertical: ${tokenItemGap}px;
			border-radius: 4px;
			${({theme, active})=>active && 'background-color:'+themed.tintColor({theme})+';'}
		`,
		Text: styled.Text`
			font-size: ${fontSize.normal}px;
			color: ${({theme, active})=>{
				if (active) return 'white'
				return themed.tintColor({theme})
			}};
			${fontWeightMedium()}
		`,
		Clear: styled.Image`
			tint-color: #ffffff90;
			margin-left: ${tokenItemGap}px;
		`
	}
}

const letterWidth = 10
export const Input = {
	Wrap: styled.View`
		height: ${formElementHeight - tokenItemGap*2+1}px;
	`,
	Input: styled(BaseInput).attrs({
		enablesReturnKeyAutomatically: false,
		blurOnSubmit: false,
		autoCorrect: false,
		autoCapitalize: 'none',
		returnKeyType: 'done',
		includeFontPadding: false,
		textAlignVertical: 'center',
	})`
		flex: 1;
		padding-vertical: 0;
		padding-horizontal: ${tokenItemGap}px;
		width: ${({value})=>(value.length||0)*letterWidth}px;
		min-width: ${({placeholder})=>(placeholder.length||0)*letterWidth}px;
		height: ${formElementHeight - tokenItemGap*2+1}px;
		text-align-vertical: center;
	`
}