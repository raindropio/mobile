import React from 'react'
import { Animated } from 'react-native'
import { width } from './button'

function Buttons({ getItems, direction='', dragX }) {
    const items = getItems()
    const count = items.length ? items.length : 1

    const translateX = dragX.interpolate({
        inputRange: direction=='right' ? [-width*count, 0] : [0, width*count],
        outputRange: direction=='right' ? [0, width*count] : [-width*count, 0],
        extrapolate: 'clamp'
    })

    return (
        <Animated.View style={{ flexDirection: 'row', transform: [{ translateX }] }}>
            {items}
        </Animated.View>
    )
}

export default React.memo(Buttons)