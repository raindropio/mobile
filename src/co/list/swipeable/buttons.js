import React from 'react'
import { Animated, View } from 'react-native'
import { width } from './button'

const emtpyViewStyle = {width}

export default class Buttons extends React.Component {
    static emptyView = <View style={emtpyViewStyle}/>

    state = {
        open: false
    }

    componentDidMount() {
        this.props.progress.addListener(this.onProgress)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.progress != this.props.prevProps){
            prevProps.progress.removeListener(this.onProgress)
            this.props.progress.addListener(this.onProgress)
        }
    }

    componentWillUnmount() {
        this.props.progress.removeListener(this.onProgress)
    }

    onProgress = ({ value })=>{
        const open = value > 0
        if (this.state.open != open)
            this.setState({ open })
    }

    render() {
        if (!this.state.open)
            return Buttons.emptyView

        const { getItems, direction='', progress } = this.props

        const items = getItems()
        const count = items.length ? items.length : 1

        const translateX = progress.interpolate({
            inputRange: [0,1],
            outputRange: direction=='right' ? [width*count, 0] : [-width*count, 0],
            extrapolate: 'clamp'
        })

        return (
            <Animated.View style={{ flexDirection: 'row', transform: [{ translateX }] }}>
                {items}
            </Animated.View>
        )
    }
}