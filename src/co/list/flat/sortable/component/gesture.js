import React, { useRef } from 'react'
import { StyleSheet, Platform } from 'react-native'
import { LongPressGestureHandler, NativeViewGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, runOnJS } from 'react-native-reanimated'

const styles = StyleSheet.create({
    wrap: {
        flex: 1
    }
})

const maxDist = Platform.select({
    android: Number.MAX_SAFE_INTEGER
})

export default function SortableGesture({ sortEnabled, children, onTouchStart, onTouchEnd, windowX, windowY }) {
    const longPressRef = useRef(null)
    const listRef = useRef(null)

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: ({ x, y }) => {
            windowX.value = x;
            windowY.value = y;
        },
        onActive: ({ x, y, oldState }) => {
            windowX.value = x;
            windowY.value = y;

            if (oldState == State.BEGAN ||
                oldState == State.UNDETERMINED)
                runOnJS(onTouchStart)({ x, y })
        },
        onEnd: ({ x, y }) => {
            runOnJS(onTouchEnd)({ x, y })
        }
    }, [windowX, windowY, onTouchStart, onTouchEnd])

    return (
        <LongPressGestureHandler
            ref={longPressRef}
            simultaneousHandlers={listRef}
            enabled={sortEnabled}
            minDurationMs={500}
            minPointers={1}
            maxPointers={Number.MAX_SAFE_INTEGER}
            shouldCancelWhenOutside={false}
            maxDist={maxDist}
            onGestureEvent={onGestureEvent}>
            <Animated.View style={styles.wrap}>
                <NativeViewGestureHandler
                    ref={listRef}
                    simultaneousHandlers={longPressRef}>
                    {children}
                </NativeViewGestureHandler>
            </Animated.View>
        </LongPressGestureHandler>
    )
}