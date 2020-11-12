import React from 'react'
import { Animated } from 'react-native'
import { Border } from './style'

export default class ListHelperShadow extends React.Component {
    offset = new Animated.Value(0)

    borderStyle = {
        opacity: this.offset.interpolate({
            inputRange: [0, 60],
            outputRange: [0, 1],
        })
    }

    onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.offset } } }],
        { useNativeDriver: false }
    )

    render() {
        return (
            <>
                {this.props.children(this.onScroll)}

                <Border style={this.borderStyle} />
            </>
        )
    }
}