import styled from 'styled-components/native'
import { BaseInput } from 'co/style/form'
import { BorderlessButton } from 'react-native-gesture-handler'

export const Wrap = styled.View`
	width: 100%;
	padding: ${({theme})=>theme.padding.small}px ${({theme})=>theme.padding.medium}px;
`

export const Touch = styled.TouchableOpacity.attrs({
})``

export const Form = styled.View`
	flex-direction: row;
	
	${({theme, variant})=>{
		switch(variant){
			case 'default':
				return `
					height: ${theme.height.button}px;
					border-radius: ${theme.height.button/2}px;
					background-color: ${theme.background.disabled};
				`
			default:
				return ''
		}
	}}
`

export const Input = styled(BaseInput).attrs(({ returnKeyType })=>({
	returnKeyType: returnKeyType || 'search',
	autoCorrect: false,
	autoCapitalize: 'none',
	includeFontPadding: false,
	enablesReturnKeyAutomatically: false
}))`
	flex: 1;
	padding-vertical: 0;
	text-align-vertical: center;

	${({theme, variant})=>{
		switch(variant){
			case 'head':
				return `
					font-size: ${theme.fontSize.head}px;
				`
			default:
				return `
					font-size: ${theme.fontSize.secondary}px;
					padding-horizontal: ${theme.padding.medium}px;
				`
		}
	}}
`

export const Button = styled(BorderlessButton)`
	width: ${({theme})=>theme.height.button}px;
	align-items: center;
	justify-content: center;
	z-index: 1;
`

export const Loading = styled.ActivityIndicator.attrs(({theme})=>({
	color: theme.text.secondary
}))`
	margin-horizontal: ${({theme})=>theme.padding.small}px;
`