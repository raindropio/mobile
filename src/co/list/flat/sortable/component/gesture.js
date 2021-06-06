import React, { useCallback } from 'react'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { useAnimatedGestureHandler } from 'react-native-reanimated'

export default function SortableGesture({ sortEnabled, children, onTouchStart, onTouchEnd, windowX, windowY }) {
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (pos) => {
            windowX.value = pos.x;
            windowY.value = pos.y;
        },
        onActive: (pos) => {
            windowX.value = pos.x;
            windowY.value = pos.y;
        }
    }, [windowX, windowY])

    const onLongPressHandlerStateChange = useCallback(({ nativeEvent: { state, x, y } })=>{
        switch(state) {
            case State.BEGAN:
            case State.ACTIVE:
                onTouchStart({ x, y })
                break

            case State.FAILED:
            case State.CANCELLED:
                onTouchEnd(undefined)
                break

            case State.END:
                onTouchEnd({ x, y })
                break
        }
    }, [onTouchStart, onTouchEnd])

    return (
        <LongPressGestureHandler
            enabled={sortEnabled}
            minDurationMs={300}
            minPointers={1}
            maxPointers={Number.MAX_SAFE_INTEGER}
            maxDist={Number.MAX_SAFE_INTEGER}
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onLongPressHandlerStateChange}>
            {children}
        </LongPressGestureHandler>
    )
}