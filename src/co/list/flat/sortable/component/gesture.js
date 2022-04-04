import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS, useSharedValue } from 'react-native-reanimated'

export default function SortableGesture({ sortEnabled, children, onTouchStart, onTouchEnd, windowX, windowY }) {
    const isLongPressed = useSharedValue(false);

    const longPress = Gesture.LongPress()
        .enabled(sortEnabled)
        .onStart(({ x, y }) => {
            runOnJS(onTouchStart)({ x, y })

            isLongPressed.value = true
        })

    const panGesture = Gesture.Pan()
        .manualActivation(true)
        .onTouchesMove((_, stateManager) => {
            if (isLongPressed.value)
                stateManager.activate()
            else
                stateManager.fail()
        })
        .onUpdate(({ x, y }) => {
            windowX.value = x
            windowY.value = y
        })
        .onTouchesUp(({ x, y }) => {
            isLongPressed.value = false
            runOnJS(onTouchEnd)({ x, y })
        })

    const composed = Gesture.Simultaneous(longPress, panGesture)

    return (
        <GestureDetector gesture={composed}>
            {children}
        </GestureDetector>
    )
}