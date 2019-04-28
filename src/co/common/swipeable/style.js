import styled from 'styled-components/native'
import {Platform, StyleSheet} from 'react-native'
import colors, {themed} from 'co/style/colors'

const background = (dark)=>dark===true ? colors.asphaltWhite : colors.asphalt
const ignoreSwipeLeftGap = (Platform.OS=='ios'?50:0)
export const buttonWidth = 60

export const nativeStyles = StyleSheet.create({
	interactable: {
		marginLeft: ignoreSwipeLeftGap
	}
})

export const SwipeableRow = styled.View`
	margin-left: ${-ignoreSwipeLeftGap}px;
	background-color: ${({theme, open})=>{
		if (!open)
			return 'transparent'
		return theme.backgroundColor || themed.main({theme})
	}}
`

export const SwipeableButtonsView = styled.View`
	position: absolute;
	top:0; right:0; bottom:0; left: 0;
	flex-direction: row;
	justify-content: flex-end;
`

export const SwipeableButton = styled.TouchableHighlight.attrs({
	underlayColor: 'rgba(0,0,0,.2)'
})`
	background-color: ${props=>props.danger ? colors.red : themed.invertedExtraLight(props)};
	width: ${buttonWidth}px;
	align-items: center;
	justify-content: center;
`/*
border-right-width: ${StyleSheet.hairlineWidth}px;
border-right-color: rgba(255,255,255,.2);
*/

export const SwipeableButtonIcon = styled.Image.attrs({
	fadeDuration:0
})`
	tint-color: ${props=>props.danger ? 'white' : themed.invertedDark(props)};
`