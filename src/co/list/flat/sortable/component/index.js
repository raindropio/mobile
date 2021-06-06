import React, { useState, useCallback, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { FlatList } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated'

import useMeasure from './useMeasure'
import useSelected from './useSelected'
import useHover from './useHover'
import withReorder from './withReorder'
import Gesture from './gesture'
import Ghost from './ghost'

const propTypes = {
    sortEnabled:    PropTypes.bool,
    itemIsSortable: PropTypes.func,
    onSortEnd:      PropTypes.func
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function Sortable({ reorder, forwardedRef, ...props}) {
    //gesture
    const [active, setActive] = useState(false)
    const [origin, setOrigin] = useState({x:0, y:0})

    const windowX = useSharedValue(0)
    const windowY = useSharedValue(0)

    //measuring
    const { measure, ...measureProps } = useMeasure({ active }, props)

    //items
    const selected = useSelected({ active, origin, measure }, props)
    const hover = useHover({ selected, windowX, windowY, measure }, props)

    //reorder
    useEffect(()=>{
        if (!selected || !hover || selected == hover) return
        
        reorder.change(selected, hover)
    }, [selected, hover])

    //events
    const onTouchStart = useCallback((pos)=>{
        setActive(true)
        setOrigin(pos)
    }, [])

    const onTouchEnd = useCallback((pos)=>{
        if (pos)
            reorder.commit()
        else
            reorder.reset()

        setOrigin({x:0,y:0})
        setActive(false)
    }, [])

    //flat list overrides
    const renderItem = useCallback(params=>{
        if (selected && props.keyExtractor(params.item) == selected)
            return props.renderItem({...params, dragState: 'selected'})

        return props.renderItem(params)
    }, [props.renderItem, props.keyExtractor, selected])

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
                    ref={forwardedRef}
                    renderItem={active ? renderItem : props.renderItem} />
            </Gesture>

            <Ghost
                {...props}

                selected={selected}
                
                measure={measure}
                windowX={windowX}
                windowY={windowY} />
        </>
    )
}

Sortable.propTypes = propTypes

const SortableWithReorder = withReorder(Sortable)

export default React.forwardRef((props, ref) => (
    <SortableWithReorder {...props} forwardedRef={ref} />
))