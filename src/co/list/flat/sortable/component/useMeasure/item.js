import React, { useCallback, useEffect } from 'react'
import { View } from 'react-native'

export default function SortableItem({ id, children, setRefs }) {
    //add ref to refs
    const bindRef = useCallback(ref=>{
        setRefs(refs=>{
            if (refs.has(id) &&
                refs.get(id) == ref)
                return refs

            const changed = new Map(refs)
            changed.set(id, ref)
            return changed
        })
    }, [id, setRefs])

    //remove ref
    useEffect(()=>{
        return ()=>
            setRefs(refs=>{
                if (!refs.has(id))
                    return refs

                const changed = new Map(refs)
                changed.delete(id)
                return changed
            })
    }, [id, setRefs])

    return (
        <View ref={bindRef}>
            {children}
        </View>
    )
}