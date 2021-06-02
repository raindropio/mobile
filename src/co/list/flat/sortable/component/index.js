import React, { useState, useCallback, useEffect } from 'react'
import { FlatList, Animated, LayoutAnimation } from 'react-native'
import { PropTypes } from 'prop-types'
import _ from 'lodash'

import Gestures from './gestures'
import CellMeasure from './cell/measure'
import CellGhost from './cell/ghost'

function SortableFlatList({ logic, sortEnabled, ...props}) {
    //context
    const [context, setContext] = useState(()=>({
        enabled: false,
        selected: undefined, //key
        drag: new Animated.ValueXY()
    }))

    //initial position
    const [initial, setInitial] = useState({ x:0, y: 0 })

    //scroll offset
    const [offset, setOffset] = useState({ x:0, y: 0 })

    //[{index: {x,y,width,height}}]
    const [positions, setPositions] = useState({})

    //get key by position
    const getKeyByPosition = useCallback(pos=>{
        for(const id in positions){
            const { x, y, width, height } = positions[id]
            const top = pos.y + offset.y
            const left = pos.x + offset.x

            if (y <= top && (y + height) >= top &&
                x <= left && (x + width) >= left){
                return id
            }
        }
        return undefined
    }, [positions, offset])

    //reorder
    useEffect(()=>{
        const id = context.drag.addListener(
            _.debounce(pos=>{
                logic.reorder(
                    context.selected,
                    getKeyByPosition(pos)
                )
            }, 50)
        )

        return ()=>context.drag.removeListener(id)
    }, [context.drag, context.selected, getKeyByPosition])

    //actions
    useEffect(()=>{
        setContext(context=>({
            ...context,
            
            startDrag: (initial)=>{
                setInitial(initial)
                setPositions({})
                setContext(context=>({
                    ...context,
                    enabled: true,
                    selected: undefined
                }))
            },

            endDrag: (pos)=>{
                setInitial({x:0,y:0})
                setPositions({})
                setContext(context=>({
                    ...context,
                    enabled: false,
                    selected: undefined
                }))

                if (pos)
                    logic.commit()
                else
                    logic.reset()
            },

            setPosition: (item, pos)=>{
                const key = props.keyExtractor(item)
                if (key)
                    setPositions(positions=>({
                        ...positions,
                        [key]: pos
                    }))
            }
        }))
    }, [])

    //find selected index
    useEffect(()=>{
        if (!context.enabled){
            if (context.selected)
                setContext(context=>({
                    ...context,
                    selected: undefined
                }))
            return
        }

        if (context.selected)
            return

        setContext(context=>({
            ...context,
            selected: getKeyByPosition(initial)
        }))
    }, [context.enabled, context.selected, initial, getKeyByPosition])

    //update scroll offset
    const onScrollEnd = useCallback(({ nativeEvent: { contentOffset: { x, y } } })=>(
        setOffset({ x, y })
    ), [])

    //override renderItem
    const renderItem = useCallback(params=>{
        if (context.selected && 
            props.keyExtractor(params.item) == context.selected)
            return props.renderItem({...params, dragState: 'selected'})

        return props.renderItem(params)
    }, [props.renderItem, context.selected])

    return (
        <>
            <Gestures 
                sortEnabled={sortEnabled}
                context={context}>
                <FlatList 
                    {...props}
                    context={context}
                    scrollEnabled={!context.enabled}
                    renderItem={context.enabled ? renderItem : props.renderItem}
                    CellRendererComponent={context.enabled ? CellMeasure : undefined}
                    onMomentumScrollEnd={onScrollEnd}
                    onScrollEndDrag={onScrollEnd} />
            </Gestures>

            <CellGhost 
                {...props}
                context={context} />
        </>
    )
}

export default class SortableFlatListWrapper extends React.Component {
    static propTypes = {
        sortEnabled: PropTypes.bool,
        itemIsSortable: PropTypes.func,
        onSortEnd: PropTypes.func
    }

    state = {
        fromKey: null,
        toKey: null,
        data: this.props.data
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data)
            this.setState({ data: this.props.data })
    }

    logic = {
        reorder: (fromKey, toKey)=>{
            if (fromKey == toKey ||
                !fromKey ||
                !toKey) return

            let fromIndex, toIndex

            const data = [...this.state.data]

            for(const index in data){
                const item = data[index]

                if (fromKey == this.props.keyExtractor(item))
                    fromIndex = parseInt(index)
                else if (toKey == this.props.keyExtractor(item))
                    toIndex = parseInt(index)

                if (typeof fromIndex != 'undefined' &&
                    typeof toIndex != 'undefined')
                    break
            }

            if (typeof fromIndex == 'undefined' ||
                typeof toIndex == 'undefined')
                return

            //check is it item sortable?
            if (typeof this.props.itemIsSortable == 'function' &&
                !this.props.itemIsSortable({ item: data[fromIndex] }))
                return

            const sorce = data[fromIndex]
            data.splice(fromIndex, 1)
            data.splice(toIndex, 0, sorce)

            LayoutAnimation.configureNext({
                ...LayoutAnimation.Presets.easeInEaseOut,
                duration: 150
            })

            this.setState({
                data,
                ...(!this.state.fromKey ? { fromKey } : {}),
                toKey
            })
        },

        commit: ()=>{
            const { fromKey, toKey } = this.state
            const { data, keyExtractor, onSortEnd } = this.props
            
            if (fromKey != toKey &&
                typeof onSortEnd == 'function') {
                let from, to

                for(const index in data){
                    const key = keyExtractor(data[index])

                    if (key == fromKey)
                        from = index
                    else if (key == toKey)
                        to = index

                    if (from && to)
                        break
                }

                onSortEnd({ from, to })
            }

            this.logic.reset()
        },

        reset: ()=>{
            this.setState({
                data: this.props.data,
                fromKey: null,
                toKey: null
            })
        }
    }

    render() {
        return (
            <SortableFlatList 
                {...this.props}
                {...this.state}
                logic={this.logic} />
        )
    }
}