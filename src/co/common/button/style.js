import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

const height = 40

const tintColor = ({theme, danger, white})=>{
	if (danger)
		return theme.color.danger;
	if (white)
		return '#ffffff'
	return theme.color.accent
}

export const ButtonText = styled.Text`
	font-size: ${({theme})=>theme.fontSize.primary}px;
	color: ${tintColor};
`

export const ButtonTextWhiteBold = styled(ButtonText)`
	color: ${({theme})=>theme.background.regular};
	${({theme})=>theme.fontWeight.semibold}
`

export const BaseButton = styled(RectButton)`
	height: ${height}px;
	justify-content: center;
	align-items: center;
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
	margin-vertical: ${({theme})=>theme.padding.small}px;
	${({disabled})=>disabled?'opacity:.4':''}
`

export const ButtonWithBg = styled(BaseButton)`
	border-radius: 2px;
	background: ${({theme})=>theme.color.accent};
	elevation: 2;
	margin-horizontal: ${({theme})=>theme.padding.medium}px;
	${({disabled})=>disabled?'background: rgba(0,0,0,.2)':''}
`