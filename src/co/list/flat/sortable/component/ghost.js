import { useState, useMemo, useEffect } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

function Ghost({ item, offset={}, windowX, windowY, renderItem, numColumns }) {
    const style = useAnimatedStyle(() => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${100/(numColumns||1)}%`,
        transform: [
            ...(numColumns > 1 ? [{ translateX: windowX.value + offset.x }] : []),
            { translateY: windowY.value + offset.y }
        ]
    }), [windowX, windowY, offset, numColumns])

    return (
        <Animated.View style={style}>
            {renderItem({ item, dragState: 'ghost' })}
        </Animated.View>
    )
}

export default function SortableGhost({ selected, measure, data, keyExtractor, ...etc }) {
    //find item to render
    const item = useMemo(()=>{
        if (!selected) return undefined
        return data.find(item=>keyExtractor(item) == selected)
    }, [selected, data, keyExtractor])

    //calculate offset style
    const [offset, setOffset] = useState(undefined)
    useEffect(()=>{
        if (!selected) {
            if (offset)
                setOffset(undefined)
            return
        }

        if (offset) return

        const m = measure.get(selected)
        if (!m) return

        setOffset({
            y: m.y - etc.windowY.value,
            x: m.x - etc.windowX.value
        })
    }, [selected, offset, etc.windowX, etc.windowY])

    if (!item || !offset) return null

    return (
        <Ghost 
            {...etc}
            item={item}
            offset={offset} />
    )
}