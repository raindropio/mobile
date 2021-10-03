import styled from 'styled-components/native'
import { BaseInput } from 'co/form'
import { BorderlessButton } from 'react-native-gesture-handler'
import size from 'modules/appearance/size'
import Icon from 'co/icon'

export const knownHeight = size.height.button + (size.padding.small*2);

export const Wrap = styled.View`
	width: 100%;
	padding: ${({theme})=>theme.padding.small}px ${({theme})=>theme.padding.medium}px;
`

export const Touch = styled.TouchableOpacity.attrs({
})``

export const Form = styled.View`
	flex-direction: row;
	align-items: center;
	height: ${({theme})=>theme.height.button}px;
	
	${({theme, variant})=>{
		switch(variant){
			case 'default':
				return `
					border-radius: ${theme.height.button/2}px;
					background-color: ${theme.background.disabled};
					padding-left: ${theme.padding.small}px;
				`
			default:
				return ''
		}
	}}
`

export const Input = styled(BaseInput).attrs(({ returnKeyType, multiline=false })=>({
	returnKeyType: returnKeyType || 'search',
	autoCorrect: false,
	autoCapitalize: 'none',
	includeFontPadding: false,
	enablesReturnKeyAutomatically: false,
	multiline
}))`
	flex: 1;
	padding-vertical: 0;
	text-align-vertical: center;
	padding-horizontal: ${({theme})=>theme.padding.small}px;

	${({theme, variant})=>{
		switch(variant){
			case 'head':
				return `
					font-size: ${theme.fontSize.head}px;
				`
			default:
				return `
					font-size: ${theme.fontSize.secondary}px;
					
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

export const MagnifierIcon = styled(Icon)`
	margin: 0 4px;
`