import { useCallback, useState, useEffect, useMemo } from 'react';
import Item from './item'

export default function useMeasure({ active }, { keyExtractor, getItemLayout, numColumns=1, data, forwardedRef }) {
    const [measures, setMeasures] = useState(()=>new Map())

    //flatlist scroll offset
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const onScrollEnd = useCallback(({ nativeEvent: { contentOffset } })=>{
        setOffset(contentOffset)
    }, [])

    //reset measures
    useEffect(()=>{
        setMeasures(new Map())
    }, [active])

    //use getItemLayout for measure calculation, best performance
    const fastCalc = getItemLayout && numColumns==1
    useEffect(()=>{
        if (!fastCalc) return
        if (!active) return

        const headerHeight = forwardedRef.current?._listRef?._headerLength || 0

        const measures = new Map()
        for(const index in data){
            const id = keyExtractor(data[index])
            const { length: height, offset: y } = getItemLayout(data, index)
            
            measures.set(id, {
                x: 0,
                y: y + headerHeight,
                height,
                width: 99999
            })
        }

        setMeasures(measures)
    }, [active, getItemLayout, keyExtractor, data, forwardedRef, fastCalc])

    //or measure each element
    const CellRendererComponent = useCallback(etc=>{
        return <Item 
            {...etc}
            setMeasures={setMeasures}
            itemKeyExtractor={keyExtractor} />
    }, [keyExtractor])

    //actions
    const measure = useMemo(()=>{
        const m = {
            findId: (pos)=>{
                if (!active) return
    
                for(const [id] of measures){
                    const { x, y, width, height } = m.get(id)
    
                    if (y <= pos.y && (y + height) >= pos.y &&
                        x <= pos.x && (x + width) >= pos.x)
                        return id
                }
            },
            get: (id)=>{
                if (!active) return
    
                const item = measures.get(id)
                return {
                    ...item,
                    x: item.x - offset.x,
                    y: item.y - offset.y
                }
            }
        }

        return m
    }, [active, measures, offset])

    return {
        measure,

        onScrollToTop: onScrollEnd,
        onScrollEndDrag: onScrollEnd,
        onMomentumScrollEnd: onScrollEnd,

        ...(active && !fastCalc ? {
            CellRendererComponent
        } : {})
    }
}