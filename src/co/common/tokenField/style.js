import styled from 'styled-components/native'
import { BaseInput, formElementHeight } from 'co/style/form'
import { BorderlessButton } from 'react-native-gesture-handler'

const tokenItemGap = 4;
export const Tokens = {
	Wrap: styled.View`
		margin: 6px 12px;
		border-radius: 24px;
		background-color: ${({theme})=>theme.color.border};
		height: auto;
		flex-direction: row;
		flex-wrap: wrap;
		padding-left: ${({theme})=>theme.padding.medium - tokenItemGap}px;
	`,
	Item: {
		Tap: styled(BorderlessButton)``,
		Content: styled.View`
			flex-direction: row;
			align-items: center;
			justify-content: center;
			height: ${formElementHeight - tokenItemGap*4}px;
			padding-horizontal: ${tokenItemGap}px;
			margin-vertical: ${tokenItemGap}px;
			border-radius: 4px;
			${({active, theme}) => {
				if (active)
					return `background-color: ${theme.dark ? theme.text.disabled : theme.color.accent};`
			}}
		`,
		Text: styled.Text`
			font-size: ${({theme})=>theme.fontSize.secondary}px;
			color: ${({ active, theme })=>{
				if (active && !theme.dark) return 'white'
				return theme.color.accent
			}};
		`,
		Clear: styled.Image`
			tint-color: #ffffff90;
			margin-left: ${tokenItemGap}px;
		`
	},
	
	EmptyArea: styled(BorderlessButton).attrs({
		activeOpacity: 1
	})`
		flex: 1;
		align-items: flex-end;
		justify-content: center;
	`
}

const letterWidth = 12
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
		font-size: ${({theme})=>theme.fontSize.secondary}px;
		flex: 1;
		padding-vertical: 0;
		padding-horizontal: ${tokenItemGap}px;
		width: ${({value})=>(value.length||0)*letterWidth}px;
		min-width: ${({placeholder})=>(placeholder.length||0)*letterWidth}px;
		height: ${formElementHeight - tokenItemGap*2+1}px;
		text-align-vertical: center;
	`
}