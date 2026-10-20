import { useCallback, useState } from 'react'
import Item from './item'

export default function useMeasure({ active, forwardedRef }, { keyExtractor, getItemLayout, numColumns=1, data }) {
    const [layoutMeasures, setMeasures] = useState(()=>new Map())

    //flatlist scroll offset
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const onScrollEnd = ({ nativeEvent: { contentOffset } })=>{
        setOffset(contentOffset)
    }

    //reset measures
    //buggy in rn 0.74
    // useEffect(()=>{
    //     setMeasures(new Map())
    // }, [active])

    //use getItemLayout for measure calculation, best performance
    const fastCalc = getItemLayout && numColumns==1
    const [headerHeight, setHeaderHeight] = useState(0)
    const onTouchStart = ()=>{
        setHeaderHeight(forwardedRef?.current?._listRef?._headerLength || 0)
    }

    let measures = layoutMeasures
    if (fastCalc && active) {
        measures = new Map()
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
    }

    //or measure each element
    //stable on purpose: a new component type would remount every cell
    const CellRendererComponent = useCallback(etc=>{
        return <Item 
            {...etc}
            setMeasures={setMeasures}
            itemKeyExtractor={keyExtractor} />
    }, [keyExtractor])

    //actions
    const measure = {
        findId: (pos)=>{
            if (!active) return

            for(const [id] of measures){
                const { x, y, width, height } = measure.get(id)

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

    return {
        measure,
        onTouchStart,

        onScrollToTop: onScrollEnd,
        onScrollEndDrag: onScrollEnd,
        onMomentumScrollEnd: onScrollEnd,

        ...(active && !fastCalc ? {
            CellRendererComponent
        } : {})
    }
}