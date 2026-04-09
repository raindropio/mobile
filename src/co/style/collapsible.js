import { useState, useCallback } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

export default function Collapsible({ visible, children, style, duration = 400, ...etc }) {
    const [contentHeight, setContentHeight] = useState(0)

    const onContentLayout = useCallback((e)=>{
        const h = e.nativeEvent.layout.height
        if (h)
            setContentHeight(prev => prev !== h ? h : prev)
    }, [])

    const animatedStyle = useAnimatedStyle(() => ({
        height: withTiming(visible ? contentHeight : 0, { duration }),
        opacity: withTiming(visible ? 1 : 0, { duration }),
    }), [visible, contentHeight, duration])

    return (
        <Animated.View {...etc} style={[style, { overflow: 'hidden' }, animatedStyle]}>
            <View
                onLayout={onContentLayout}
                style={{ position: 'absolute', left: 0, right: 0 }}>
                {children}
            </View>
        </Animated.View>
    )
}