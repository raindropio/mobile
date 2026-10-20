import { useState, useEffect, useEffectEvent } from 'react'
import { PropTypes } from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { LegacyFlatList as FlatList } from 'react-native-gesture-handler'
import Animated, { useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import useMeasure from './useMeasure'
import useSelected from './useSelected'
import useHover from './useHover'
import withReorder from './withReorder'
import Gesture from './gesture'
import Ghost from './ghost'
import { refreshControl } from 'co/list/flat/basic'

const propTypes = {
    sortEnabled:    PropTypes.bool,
    itemIsSortable: PropTypes.func,
    onDragStart: PropTypes.func,
    onSortEnd:      PropTypes.func
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

function Sortable({ reorder, forwardedRef, onRefresh, refreshing, ...props }) {
    //gesture
    const [active, setActive] = useState(false)
    const [origin, setOrigin] = useState({x:0, y:0})

    const windowX = useSharedValue(0)
    const windowY = useSharedValue(0)

    //measuring
    const { measure, onTouchStart: onMeasureStart, ...measureProps } = useMeasure({ active, forwardedRef }, props)

    //items
    const selected = useSelected({ active, origin, measure }, props)
    const hover = useHover({ selected, windowX, windowY, measure }, props)

    const onDragStart = useEffectEvent(id=>{
        if (typeof props.onDragStart == 'function')
            props.onDragStart({ item: props.data.find(item=>props.keyExtractor(item) == id) })
    })
    useEffect(()=>{
        if (selected) onDragStart(selected)
    }, [selected])

    //reorder
    useEffect(()=>{
        if (!selected || !hover || selected == hover) return
        
        reorder.change(selected, hover)
    }, [selected, hover, reorder])

    //events
    const onTouchStart = (pos)=>{
        onMeasureStart()
        setActive(true)
        setOrigin(pos)
    }

    const onTouchEnd = (pos)=>{
        if (pos)
            reorder.commit()
        else
            reorder.reset()

        setOrigin({x:0,y:0})
        setActive(false)
    }

    //flat list overrides
    const renderItem = params=>{
        if (selected && props.keyExtractor(params.item) == selected)
            return props.renderItem({...params, dragState: 'selected'})

        return props.renderItem(params)
    }

    const insets = useSafeAreaInsets()

    return (
        <>
            <Gesture 
                {...props}

                windowX={windowX}
                windowY={windowY}
                
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}>
                <AnimatedFlatList 
                    {...props}
                    {...measureProps}
                    {...(active ? {
                        pointerEvents: 'none'
                    } : {})}
                    scrollEnabled={!active}
                    refreshControl={refreshControl({ onRefresh, refreshing })}
                    ref={forwardedRef}
                    renderItem={active ? renderItem : props.renderItem}
                    contentContainerStyle={{
                        paddingBottom: insets.bottom,
                        paddingLeft: insets.left,
                        paddingRight: insets.right
                    }} />
            </Gesture>

            {/* always-mounted wrapper: Ghost appears/disappears inside it, because
                mounting siblings next to the display:contents GestureDetector
                crashes Fabric (YGNodeGetOwner assertion, facebook/react-native#52349) */}
            <View style={StyleSheet.absoluteFill} pointerEvents='box-none'>
                <Ghost
                    {...props}

                    selected={selected}
                    origin={origin}

                    measure={measure}
                    windowX={windowX}
                    windowY={windowY} />
            </View>
        </>
    )
}

Sortable.propTypes = propTypes

const SortableWithReorder = withReorder(Sortable)

export default function SortableFlatList({ ref, ...props }) {
    return <SortableWithReorder {...props} forwardedRef={ref} />
}