import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated'

const styles = StyleSheet.create({
    wrap: {
        flex: 1
    }
})

export default function SortableGesture({ sortEnabled, children, onTouchStart, onTouchEnd, absoluteX, absoluteY, windowX, windowY }) {
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (pos) => {
            absoluteX.value = pos.absoluteX;
            absoluteY.value = pos.absoluteY;

            windowX.value = pos.x;
            windowY.value = pos.y;
        },
        onActive: (pos) => {
            absoluteX.value = pos.absoluteX;
            absoluteY.value = pos.absoluteY;

            windowX.value = pos.x;
            windowY.value = pos.y;
        }
    }, [absoluteX, absoluteY, windowX, windowY])

    const onLongPressHandlerStateChange = useCallback(({ nativeEvent: { state, absoluteX, absoluteY } })=>{
        switch(state) {
            case State.BEGAN:
            case State.ACTIVE:
                onTouchStart({ x: absoluteX, y: absoluteY })
                break

            case State.FAILED:
            case State.CANCELLED:
                onTouchEnd(undefined)
                break

            case State.END:
                onTouchEnd({ x: absoluteX, y: absoluteY })
                break
        }
    }, [onTouchStart, onTouchEnd])

    return (
        <LongPressGestureHandler
            enabled={sortEnabled}
            minDurationMs={300}
            minPointers={1}
            maxPointers={Number.MAX_SAFE_INTEGER}
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onLongPressHandlerStateChange}>
            <Animated.View style={styles.wrap}>
                {children}
            </Animated.View>
        </LongPressGestureHandler>
    )
}