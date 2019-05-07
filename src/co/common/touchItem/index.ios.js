import React from 'react'
import {
	TouchableHighlight
} from 'react-native'
import colors, {themeIsDark} from 'co/style/colors'

export default class TouchItem extends React.Component {
	render() {
		const {children, ...original} = this.props

		return (
			<TouchableHighlight 
				{...original}
				underlayColor={themeIsDark() ? colors.touchFeedbackWhite : colors.touchFeedback}>
				{children}
			</TouchableHighlight>
		)
	}
}