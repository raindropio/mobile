import React, { useRef, useCallback, useMemo } from 'react'
import { Animated } from 'react-native'
import { PanGestureHandler, LongPressGestureHandler, State } from 'react-native-gesture-handler'

export default function SortableGesture({ children, sortEnabled, context }) {
    const { drag, startDrag, endDrag } = context

    const longPressGesture = useRef(null)

    const onLongPressHandlerStateChange = useCallback(({ nativeEvent: { state, x, y } })=>{
        switch(state) {
            case State.BEGAN:
            case State.ACTIVE:
                startDrag({x, y})
            break

            case State.FAILED:
            case State.CANCELLED:
                endDrag()
                break

            case State.END:
                endDrag({x, y})
                break
        }
    }, [startDrag, endDrag])

    const gestureHandler = useMemo(()=>(
        Animated.event(
            [{ nativeEvent: {
                x: drag.x,
                y: drag.y
            } }],
            { useNativeDriver: false }
        )
    ), [drag])

    return (
        <PanGestureHandler
            enabled={sortEnabled}
            maxPointers={1}
            simultaneousHandlers={longPressGesture}
            onGestureEvent={gestureHandler}>
            <LongPressGestureHandler
                ref={longPressGesture}
                enabled={sortEnabled}
                minDurationMs={300}
                maxPointers={1}
                onGestureEvent={gestureHandler}
                onHandlerStateChange={onLongPressHandlerStateChange}>
                {children}
            </LongPressGestureHandler>
        </PanGestureHandler>
    )
}