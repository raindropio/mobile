import { useState } from 'react'

export default function useSelected({active, origin, measure}, { itemIsSortable, keyExtractor, data }) {
    const [selected, setSelected] = useState(undefined)

    if (!active && selected)
        setSelected(undefined)

    if (active && !selected) {
        const id = measure.findId(origin)
        if (id){
            const sortable = typeof itemIsSortable=='function' ?
                itemIsSortable({ item: data.find(item=>keyExtractor(item) == id) }) :
                true

            if (sortable)
                setSelected(id)
        }
    }

    return selected
}