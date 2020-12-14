import React from 'react'
import { Animated } from 'react-native'
import { Border } from './style'

export default class ListHelperShadow extends React.Component {
    scrolled = false

    borderStyle = {
        opacity: new Animated.Value(0)
    }

    onScroll = (prop)=>{
        const offset = prop.nativeEvent ? prop.nativeEvent.contentOffset.y : prop

        const scrolled = (offset > 10 ? true : false)
        if (scrolled == this.scrolled) return
        this.scrolled = scrolled

        if (this._wait)
            cancelAnimationFrame(this._wait)

        this._wait = requestAnimationFrame(()=>{
            Animated.timing(
                this.borderStyle.opacity,
                {
                    toValue: this.scrolled ? 1: 0,
                    duration: 150,
                    useNativeDriver: true
                }
            ).start()
        })
    }

    render() {
        return (
            <>
                {this.props.children(this.onScroll)}

                <Border style={this.borderStyle} />
            </>
        )
    }
}