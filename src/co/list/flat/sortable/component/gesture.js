import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { scheduleOnRN } from 'react-native-worklets'

export default function SortableGesture({ sortEnabled, children, onTouchStart, onTouchEnd, windowX, windowY }) {
    const panGesture = Gesture.Pan()
        .enabled(sortEnabled)
        .activateAfterLongPress(500)
        .onStart(({ x, y }) => {
            windowX.value = x
            windowY.value = y

            scheduleOnRN(onTouchStart, { x, y })
        })
        .onUpdate(({ x, y }) => {
            windowX.value = x
            windowY.value = y
        })
        .onTouchesUp(({ x, y }) => {
            scheduleOnRN(onTouchEnd, { x, y })
        })
        .onTouchesCancelled(()=>{
            scheduleOnRN(onTouchEnd)
        })

    return (
        <GestureDetector gesture={panGesture}>
            {children}
        </GestureDetector>
    )
}