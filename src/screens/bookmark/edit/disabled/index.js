import React, { useRef, useEffect, useMemo } from 'react'
import { Animated } from 'react-native'
import { View } from './style'

export default function({ status }) {
    const opacity = useRef(new Animated.Value(.5)).current
    const loading = useMemo(()=>status == 'idle' || status == 'loading', [status])

    useEffect(()=>{
        const anim = Animated.timing(opacity, {
            toValue: loading ? .5 : 0,
            duration: 400,
            useNativeDriver: true
        })

        anim.start()
        return anim.stop
    }, [loading])

    return (
        <View 
            pointerEvents={loading ? 'auto' : 'none'}
            style={{opacity}} />
    )
}