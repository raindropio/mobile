import { useState } from 'react'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function Ghost({ item, offset={}, windowX, windowY, renderItem, numColumns }) {
    const insets = useSafeAreaInsets()

    const insetLeft = insets.left
    const insetRight = insets.right
    const offsetX = offset.x
    const offsetY = offset.y
    const widthPct = `${100/(numColumns||1)}%`
    const isMultiColumn = numColumns > 1

    const style = useAnimatedStyle(() => ({
        position: 'absolute',
        top: 0,
        left: insetLeft,
        right: insetRight,
        width: widthPct,
        transform: [
            ...(isMultiColumn ? [{ translateX: windowX.value + offsetX }] : []),
            { translateY: windowY.value + offsetY }
        ]
    }))

    return (
        <Animated.View style={style}>
            {renderItem({ item, dragState: 'ghost' })}
        </Animated.View>
    )
}

export default function SortableGhost({ selected, origin, measure, data, keyExtractor, ...etc }) {
    //find item to render
    const item = selected ? data.find(item=>keyExtractor(item) == selected) : undefined

    //offset from the touch point, latched when the item gets selected
    const [offset, setOffset] = useState(undefined)
    if (!selected && offset)
        setOffset(undefined)

    if (selected && !offset) {
        const m = measure.get(selected)
        if (m)
            setOffset({
                y: m.y - origin.y,
                x: m.x - origin.x
            })
    }

    if (!item || !offset) return null

    return (
        <Ghost 
            {...etc}
            item={item}
            offset={offset} />
    )
}