import { useEffect } from 'react'
import { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'
import { View } from './style'

export default function({ status }) {
    const loading = status == 'idle' || status == 'loading'

    //anim
    const opacity = useSharedValue(0)
    const style = useAnimatedStyle(() => ({
        opacity: withTiming(opacity.value, {
            duration: 150,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
    }))

    useEffect(()=>{
        opacity.value = loading ? .5 : 0
    }, [loading, opacity])

    return (
        <View 
            pointerEvents={loading ? 'auto' : 'none'}
            style={style} />
    )
}