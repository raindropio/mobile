import styled from 'styled-components/native'
import { fontWeightMedium } from 'co/style/font'
import { fontSize, paddingHorizontal } from 'co/style/constants'
import colors, {themed} from 'co/style/colors'

const height = 40

const tintColor = ({theme, danger, white})=>{
	if (danger)
		return colors.red;
	if (white)
		return '#ffffff'
	return themed.tintColor({theme})
}

export const ButtonText = styled.Text`
	font-size: ${fontSize.normal}px;
	color: ${tintColor};
`

export const ButtonImage = styled.Image`
	tint-color: ${tintColor};
`

export const ButtonTextWhiteBold = styled(ButtonText)`
	color: ${themed.main};
	${fontWeightMedium}
`

export const BaseButton = styled.TouchableOpacity`
	height: ${height}px;
	justify-content: center;
	align-items: center;
	padding-horizontal: ${paddingHorizontal}px;
	margin-vertical: ${paddingHorizontal/2}px;
	${({disabled})=>disabled?'opacity:.4':''}
`

export const ButtonWithBg = styled(BaseButton)`
	border-radius: 2px;
	background: ${themed.tintColor};
	elevation: 2;
	margin-horizontal: ${paddingHorizontal}px;
	${({disabled})=>disabled?'background: rgba(0,0,0,.2)':''}
`