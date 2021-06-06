import React, { useCallback, useState, useEffect, useMemo } from 'react'
import Item from './item'

export default function useMeasure({ active }, { keyExtractor }) {
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

    //measures
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

        ...(active ? {
            CellRendererComponent
        } : {})
    }
}