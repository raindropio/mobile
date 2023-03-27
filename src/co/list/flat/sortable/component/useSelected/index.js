import { useState, useEffect } from 'react';

export default function useSelected({active, origin, measure}, { itemIsSortable, keyExtractor, data }) {
    const [selected, setSelected] = useState(undefined)

    useEffect(()=>{
        if (!active) {
            if (selected) setSelected(undefined)
            return
        }

        if (selected) return

        const id = measure.findId(origin)
        if (id){
            if (typeof itemIsSortable=='function'){
                const item = data.find(item=>keyExtractor(item) == id)
                if (!itemIsSortable({ item }))
                    return
            }
            
            setSelected(id)
        }
    }, [active, origin, measure, selected, itemIsSortable, keyExtractor, data])

    return selected
}