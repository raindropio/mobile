import React from 'react'
import {
	TouchableNativeFeedback, View
} from 'react-native'
import {themeIsDark} from 'co/style/colors'

var bg = {}
const getBackground = ()=>{
	if (bg[themeIsDark()])
		return bg[themeIsDark()]

	bg[themeIsDark()] = TouchableNativeFeedback.canUseNativeForeground() ? 
		TouchableNativeFeedback.Ripple(themeIsDark() ? '#ffffff30' : '#00000030',false) :
		TouchableNativeFeedback.SelectableBackground()
	return bg[themeIsDark()]
}

export default class TouchItem extends React.Component {
	render() {
		const { style, children, onPress, onLongPress} = this.props

		return (
			<TouchableNativeFeedback style={style} useForeground={TouchableNativeFeedback.canUseNativeForeground()} background={getBackground()} onPress={onPress} onLongPress={onLongPress}>
				<View>{children}</View>
			</TouchableNativeFeedback>
		)
	}
}