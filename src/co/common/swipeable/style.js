import styled from 'styled-components/native'
import {Platform, StyleSheet} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

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
		backgroundColor: 'gray'
	}
})

export const SwipeableButton = styled(RectButton).attrs({
	underlayColor: 'rgba(0,0,0,.2)'
})`
	background-color: ${({danger, theme})=>danger ? theme.color.danger : theme.color.border};
	width: ${buttonWidth}px;
	align-items: center;
	justify-content: center;
`

export const SwipeableButtonIcon = styled.Image.attrs({
	fadeDuration:0
})`
	tint-color: ${({danger, theme})=>danger ? 'white' : theme.text.regular};
`