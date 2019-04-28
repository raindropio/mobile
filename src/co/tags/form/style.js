import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { fontSize, paddingHorizontal } from 'co/style/constants'
import { fontWeightMedium } from 'co/style/font'
import { BaseInput, baseFormElementStyle, formElementHeight } from 'co/style/form'
import { themed, themeIsDark } from 'co/style/colors'

export const Form = {
	Wrap: styled.View`
		flex: 1;
	`
}

const tokenItemGap = 4;
export const Tokens = {
	Wrap: styled.View`
		${({theme})=>baseFormElementStyle(theme)}
		height: auto;
		flex-direction: row;
		flex-wrap: wrap;
		padding-vertical: ${tokenItemGap}px;
		margin-left: ${paddingHorizontal-tokenItemGap}px;
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


const suggestedItemGap = 5;
export const Suggested = {
	Wrap: styled.View`
		${({theme})=>baseFormElementStyle(theme)}
		height: auto;
		border-top-width: ${StyleSheet.hairlineWidth}px;
		padding-vertical: ${suggestedItemGap}px;
	`,
	Content: styled.View`
		margin-left: ${-suggestedItemGap}px;
		flex-direction: row;
		flex-wrap: wrap;
	`,
	Label: {
		Wrap: styled.View`
			height: ${formElementHeight - suggestedItemGap*2}px;
			margin-horizontal: ${suggestedItemGap}px;
			justify-content: center;
		`,
		Text: styled.Text`
			font-size: ${fontSize.micro};
			color: ${({theme})=>theme.dark===true?'#ffffff70':'#666666'};
		`
	},
	Item: {
		Tap: styled.TouchableOpacity``,
		Content: styled.View`
			justify-content: center;
			height: ${formElementHeight - suggestedItemGap*4}px;
			padding-horizontal: ${suggestedItemGap}px;
			margin: ${suggestedItemGap}px;
			background-color: #9FA7B4;
			border-radius: 4px;
		`,
		Text: styled.Text`
			font-size: ${fontSize.normal}px;
			color: white;
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

export const Other = {
	Wrap: styled.View`
		${({theme})=>baseFormElementStyle(theme)}
		height: auto;
		border-top-width: ${StyleSheet.hairlineWidth}px;
	`,
	List: styled.FlatList.attrs({
		initialNumToRender: 100,
		keyboardShouldPersistTaps: 'always'
	})`
		flex: 1
	`,
	Item: {
		Tap: styled.TouchableOpacity`
			height: ${formElementHeight}px;
			justify-content: center;
		`,
		Text: styled.Text`
			font-size: ${fontSize.normal};
			color: ${themed.invertedDark};
		`
	}
}