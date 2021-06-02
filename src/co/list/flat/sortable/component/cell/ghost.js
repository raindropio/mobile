import React from 'react'
import { Animated, StyleSheet } from 'react-native'

const SortableGhostItem = React.memo(
    function({ selected, drag, data, renderItem, keyExtractor, numColumns }) {
        if (!selected)
            return null

        let item
        for (const elem of data)
            if (keyExtractor(elem) == selected){
                item = elem
                break
            }

        if (!item)
            return null

        return (
            <Animated.View style={[
                styles.item,
                {
                    width: `${100/(numColumns||1)}%`,
                    transform: [
                        ...(numColumns>1 ? [{ translateX: drag.x }] : []),
                        { translateY: drag.y },
                    ]
                }
            ]}>
                {renderItem({ item, dragState: 'ghost' })}
            </Animated.View>
        )
    }
)

export default function SortableGhost({ context, ...etc }) {
    const { selected, drag } = context

    return (
        <SortableGhostItem 
            {...etc}
            selected={selected}
            drag={drag} />
    )
}

const styles = StyleSheet.create({
	item: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9999
    }
})