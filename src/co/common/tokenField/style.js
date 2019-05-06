import styled from 'styled-components/native'
import { fontSize, paddingHorizontal } from 'co/style/constants'
import { BaseInput, formElementHeight } from 'co/style/form'
import { themed } from 'co/style/colors'

const tokenItemGap = 4;
export const Tokens = {
	Wrap: styled.View`
		margin: 6px 12px;
		border-radius: 24px;
		background-color: ${themed.mainAlt};
		height: auto;
		flex-direction: row;
		flex-wrap: wrap;
		padding-left: ${paddingHorizontal - tokenItemGap}px;
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
			${props => {
				if (props.active)
					return `background-color: ${props.theme.dark ? themed.invertedLight() : props.theme.tintColor || themed.tintColor()};`
			}}
		`,
		Text: styled.Text`
			font-size: ${fontSize.sub}px;
			color: ${props=>{
				if (props.active && !props.theme.dark) return 'white'
				return themed.tintColor(props)
			}};
		`,
		Clear: styled.Image`
			tint-color: #ffffff90;
			margin-left: ${tokenItemGap}px;
		`
	},
	
	EmptyArea: styled.TouchableOpacity.attrs({
		activeOpacity: 1
	})`
		flex: 1;
		align-items: flex-end;
		justify-content: center;
	`
}

const letterWidth = 14
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
		font-size: ${fontSize.sub}px;
		flex: 1;
		padding-vertical: 0;
		padding-horizontal: ${tokenItemGap}px;
		width: ${({value})=>(value.length||0)*letterWidth}px;
		min-width: ${({placeholder})=>(placeholder.length||0)*letterWidth}px;
		height: ${formElementHeight - tokenItemGap*2+1}px;
		text-align-vertical: center;
	`
}