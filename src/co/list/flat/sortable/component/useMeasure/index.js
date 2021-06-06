import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { Platform } from 'react-native'
import Item from './item'

const _measureTimeouts = new Map()
const _measureMs = Platform.select({ android: 300, ios: 100 })
function measureInWindow(id, ref) {
    return new Promise(res=>{
        clearTimeout(_measureTimeouts.get(ref))

        _measureTimeouts.set(
            ref,
            setTimeout(()=>{
                if (!ref || !ref.measure)
                    return res([id, { x: -999, y: -999, width: 0, height: 0 }])
                    
                ref.measure(
                    (x, y, width, height, pageX, pageY)=>
                        res([id, { x, y: pageY, width, height }])
                )
            }, _measureMs)
        )
    })
}

export default function useMeasure({ active }, props) {
    const [refs, setRefs] = useState(()=>new Map())
    const [measures, setMeasures] = useState(()=>new Map())

    const renderItem = useCallback(params=>(
        <Item 
            id={props.keyExtractor(params.item)}
            numColumns={props.numColumns}
            setRefs={setRefs}>
            {props.renderItem(params)}
        </Item>
    ), [props.renderItem, props.numColumns])

    //reset measures
    useEffect(()=>{
        setMeasures(new Map())
    }, [active])

    //process measuring when drag active
    useEffect(()=>{
        if (!active) return

        async function run() {
            const measures = new Map()
            const temp = await Promise.all(
                [...refs.entries()]
                    .map(([id, ref])=>measureInWindow(id, ref))
            )

            for(const [id, measure] of temp){
                measures.set(id, measure)
            }

            setMeasures(measures)
        }

        run().catch(e=>{
            console.log('Sortable measure failed', e)
        })
    }, [active, refs, props.data])

    //actions
    const measure = useMemo(()=>({
        findId: (pos)=>{
            for(const [id, { x, y, width, height }] of measures)
                if (y <= pos.y && (y + height) >= pos.y &&
                    x <= pos.x && (x + width) >= pos.x)
                    return id
        },
        get: (id)=>
            measures.get(id)
    }), [measures])

    return {
        measure,
        renderItem
    }
}