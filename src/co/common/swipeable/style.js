import styled from 'styled-components/native'
import {Platform, StyleSheet} from 'react-native'
import colors, {themed} from 'co/style/colors'

const ignoreSwipeLeftGap = (Platform.OS=='ios'?20:0)
export const buttonWidth = 60

export const styles = StyleSheet.create({
	interactable: {
		marginLeft: ignoreSwipeLeftGap
	},
	buttons: {
		position: 'absolute',
		top: 0, right: 0, bottom: 0, left: 0,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	row: {
		marginLeft: -ignoreSwipeLeftGap
	},
	rowOpen: {
		backgroundColor: themed.main()
	}
})

export const SwipeableButton = styled.TouchableHighlight.attrs({
	underlayColor: 'rgba(0,0,0,.2)'
})`
	background-color: ${props=>props.danger ? colors.red : themed.invertedExtraLight(props)};
	width: ${buttonWidth}px;
	align-items: center;
	justify-content: center;
`

export const SwipeableButtonIcon = styled.Image.attrs({
	fadeDuration:0
})`
	tint-color: ${props=>props.danger ? 'white' : themed.invertedDark(props)};
`