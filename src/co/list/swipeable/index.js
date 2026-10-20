import { useState, useRef, useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolation, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { scheduleOnRN } from 'react-native-worklets'
import { width } from './button'
import Context from './context'

export * from './button'

let opened = new Set([])

//tuned to feel like the previous Animated.spring({ bounciness: 5 })
const spring = {
    stiffness: 180,
    damping: 22,
    mass: 1,
    restSpeedThreshold: 10.7,
    restDisplacementThreshold: 0.4,
}

const sideStyle = {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    bottom: 0,
}

export default function MySwipeable({ left, right, children }) {
    const [value, setValue] = useState(0)
    //mirrored synchronously: settle() may run before react commits
    const valueRef = useRef(0)

    const x = useSharedValue(0)
    const startX = useSharedValue(0)

    //the whole tree is static: strips and their buttons are permanently mounted,
    //closed strips just sit translated off-screen. Buttons are Touchables which
    //render display:contents native views, and mounting/unmounting those while
    //reanimated animates this subtree crashes Fabric (YGNodeGetOwner assertion,
    //facebook/react-native#52349) — e.g. when closing one row while opening another
    const leftComponent = left ? left() : undefined
    const rightComponent = right ? right() : undefined
    const leftWidth = (leftComponent ? (typeof leftComponent.length != 'undefined' ? leftComponent.length : 1) : 0) * width
    const rightWidth = (rightComponent ? (typeof rightComponent.length != 'undefined' ? rightComponent.length : 1) : 0) * width

    let sides = [0]
    if (leftWidth) sides.unshift(leftWidth)
    if (rightWidth) sides.push(-rightWidth)

    //stable identities: `close` is tracked in `opened` and exposed through context,
    //the handlers read the mirrored value instead of the closure
    const [{ settle, closeOthers, actions }] = useState(()=>{
        const scroll = (target, velocityX=0)=>{
            if (target)
                opened.add(close)
            else
                opened.delete(close)

            valueRef.current = target
            setValue(target)

            x.set(withSpring(target, { ...spring, velocity: velocityX }))
        }

        const close = ()=>scroll(0)

        const closeOthers = ()=>{
            if (valueRef.current) return

            for(const close of opened)
                close()
        }

        //descide where to go next
        const settle = (sides, translationX, velocityX)=>{
            const value = valueRef.current

            let side = sides.indexOf(value)
            if (value)
                side = sides.indexOf(0)
            else if (translationX < -50) side++
            else if (translationX > 50) side--

            side = Math.min(Math.max(side, 0), sides.length-1)

            scroll(sides[side], velocityX)
        }

        return { settle, closeOthers, actions: { close } }
    })
    const { close } = actions

    useEffect(() => () => { opened.delete(close) }, [close])

    //builder api on purpose: it goes through the legacy detector which attaches to
    //the child directly, without the display:contents native view the v3 hooks
    //detector renders (that node crashes Fabric when list rows recycle mid-animation)
    const pan = Gesture.Pan()
        .enabled(left || right ? true : false)
        .activeOffsetX([-10, 50])
        .onBegin(() => {
            startX.set(x.get())
            scheduleOnRN(closeOthers)
        })
        .onUpdate(e => {
            x.set(startX.get() + e.translationX)
        })
        .onEnd(e => {
            scheduleOnRN(settle, sides, e.translationX, e.velocityX)
        })

    const tap = Gesture.Tap()
        .enabled(value ? true : false)
        .onStart(() => {
            scheduleOnRN(close)
        })

    const gesture = Gesture.Race(pan, tap)

    const leftStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: interpolate(x.value, [0, leftWidth || 1], [-(leftWidth || 1), 0], Extrapolation.CLAMP) }]
    }))

    const rightStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: interpolate(x.value, [-(rightWidth || 1), 0], [0, rightWidth || 1], Extrapolation.CLAMP) }]
    }))

    const mainStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }]
    }))

    return (
        <Context.Provider value={actions}>
            <Animated.View style={[sideStyle, { left: 0 }, leftStyle]}>
                {leftComponent}
            </Animated.View>

            <Animated.View style={[sideStyle, { right: 0 }, rightStyle]}>
                {rightComponent}
            </Animated.View>

            <GestureDetector gesture={gesture}>
                <Animated.View
                    pointerEvents={value ? 'box-only' : 'auto'}
                    style={mainStyle}>
                    {children}
                </Animated.View>
            </GestureDetector>
        </Context.Provider>
    )
}