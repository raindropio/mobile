import React from 'react'
import { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler } from 'react-native-reanimated'
import { Border } from './style'

export default function ListHelperShadow({ children }) {
    const translationY = useSharedValue(0)

    const onScroll = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.y
    })
  
    const style = useAnimatedStyle(() => ({
        opacity: translationY.value/10
    }))
  
    return (
        <>
            {children(onScroll)}
            <Border style={style} />
        </>
    )
}