import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { scheduleOnRN } from 'react-native-worklets'

const flexOne = { flex: 1 }

export default function SortableGesture({ sortEnabled, disableVirtualization, children, onTouchStart, onTouchEnd, windowX, windowY }) {
    const panGesture = Gesture.Pan()
        .enabled(sortEnabled)
        .activateAfterLongPress(500)
        .onStart(({ x, y }) => {
            windowX.set(x)
            windowY.set(y)

            scheduleOnRN(onTouchStart, { x, y })
        })
        .onUpdate(({ x, y }) => {
            windowX.set(x)
            windowY.set(y)
        })
        .onTouchesUp(({ x, y }) => {
            scheduleOnRN(onTouchEnd, { x, y })
        })
        .onTouchesCancelled(()=>{
            scheduleOnRN(onTouchEnd)
        })

    //own native view for the pan: with a refreshControl the list's host view is the
    //SwipeRefreshLayout, and a pan attached to it never activates on long press
    return (
        <GestureDetector gesture={panGesture}>
            <View style={disableVirtualization ? undefined : flexOne} collapsable={false}>
                {children}
            </View>
        </GestureDetector>
    )
}