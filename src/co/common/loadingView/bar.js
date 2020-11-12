import React from 'react'
import {Animated, Dimensions, Easing} from 'react-native'
import {Bar, Line} from './style'

export default class LoadingBar extends React.PureComponent {
	constructor(props) {
		super(props);

		const windowWidth = Math.max(Dimensions.get('window').width, Dimensions.get('screen').width)

		this.minPos = -windowWidth
		this.maxPos = windowWidth
		this.state = {
			pos: new Animated.Value(this.minPos),
			fade: new Animated.Value(0)
		}
	}

	componentDidMount() {
		this.anim = Animated.loop(Animated.timing(
			this.state.pos,
			{
				toValue: this.maxPos,
				easing: Easing.inOut(Easing.ease),
				duration: 800,
				delay: 1000,
				useNativeDriver: true
			}
		))
		this.anim.start()

		Animated.timing(this.state.fade, {toValue: 1, delay: 1000, duration: 150, useNativeDriver: true}).start();
	}

	componentWillUnmount() {
		if (this.anim)
			this.anim.stop()
	}

	render() {
		const style = {
			opacity: this.state.pos.interpolate({
				inputRange: [this.minPos, this.maxPos],
				outputRange: [0.5, 1],
			}),
			transform: [{
				translateX: this.state.pos
			}]
		}

		return <Bar style={{opacity:this.state.fade}}><Line style={style} /></Bar>
	}
}