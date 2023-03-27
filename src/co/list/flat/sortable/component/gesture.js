import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'

export default function SortableGesture({ sortEnabled, children, onTouchStart, onTouchEnd, windowX, windowY }) {
    const panGesture = Gesture.Pan()
        .enabled(sortEnabled)
        .activateAfterLongPress(500)
        .onStart(({ x, y }) => {
            windowX.value = x
            windowY.value = y
            
            runOnJS(onTouchStart)({ x, y })
        })
        .onUpdate(({ x, y }) => {
            windowX.value = x
            windowY.value = y
        })
        .onTouchesUp(({ x, y }) => {
            runOnJS(onTouchEnd)({ x, y })
        })
        .onTouchesCancelled(()=>{
            runOnJS(onTouchEnd)()
        })

    return (
        <GestureDetector gesture={panGesture}>
            {children}
        </GestureDetector>
    )
}