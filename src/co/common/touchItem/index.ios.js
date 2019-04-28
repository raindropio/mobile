import React from 'react'
import {
	TouchableHighlight
} from 'react-native'
import colors, {themeIsDark} from 'co/style/colors'

export default class TouchItem extends React.Component {
	render() {
		const {style, children, onPress, onLongPress} = this.props

		return (
			<TouchableHighlight style={style} underlayColor={themeIsDark() ? colors.touchFeedbackWhite : colors.touchFeedback} onPress={onPress} onLongPress={onLongPress}>
				{children}
			</TouchableHighlight>
		)
	}
}