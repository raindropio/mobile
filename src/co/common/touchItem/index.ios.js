import React from 'react'
import {
	TouchableHighlight
} from 'react-native'
import colors, {themeIsDark} from 'co/style/colors'

export default class TouchItem extends React.Component {
	color = themeIsDark() ? colors.touchFeedbackWhite : colors.touchFeedback

	render() {
		return (
			<TouchableHighlight 
				{...this.props}
				underlayColor={this.color} />
		)
	}
}