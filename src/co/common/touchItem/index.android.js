import React from 'react'
import {
	TouchableNativeFeedback, View
} from 'react-native'
import { themeIsDark } from 'co/style/colors'

var bg = {}
const getBackground = ()=>{
	if (bg[themeIsDark()])
		return bg[themeIsDark()]

	bg[themeIsDark()] = TouchableNativeFeedback.canUseNativeForeground() ? 
		TouchableNativeFeedback.Ripple(themeIsDark() ? '#ffffff30' : '#00000030',false) :
		TouchableNativeFeedback.SelectableBackground()
	return bg[themeIsDark()]
}

const useForeground = TouchableNativeFeedback.canUseNativeForeground()

export default class TouchItem extends React.Component {
	background = getBackground()

	render() {
		const { style, children, onPress, onLongPress} = this.props

		return (
			<TouchableNativeFeedback style={style} useForeground={useForeground} background={this.background} onPress={onPress} onLongPress={onLongPress}>
				<View>{children}</View>
			</TouchableNativeFeedback>
		)
	}
}