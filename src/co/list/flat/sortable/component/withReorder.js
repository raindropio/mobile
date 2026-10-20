import { useState, useRef, useLayoutEffect } from 'react'
import { LayoutAnimation } from 'react-native'

function useReorder(props) {
    const { data: propsData, keyExtractor, onSortEnd } = props

    const [dragId, setDragId] = useState(null)
    const [data, setData] = useState(propsData)
    const [prevPropsData, setPrevPropsData] = useState(propsData)
    if (propsData != prevPropsData) {
        setPrevPropsData(propsData)
        setData(propsData)
    }

    //reorder keeps a stable identity (effects downstream depend on it),
    //its methods read the latest values through a ref synced before any passive effect runs
    const latest = useRef({})
    useLayoutEffect(()=>{
        latest.current = { data, dragId, propsData, keyExtractor, onSortEnd }
    })

    const [reorder] = useState(()=>{
        const change = (fromId, toId)=>{
            if (fromId == toId || !fromId || !toId) return

            const { keyExtractor, dragId } = latest.current
            let fromIndex, toIndex

            const data = [...latest.current.data]

            for(const index in data){
                const item = data[index]

                if (fromId == keyExtractor(item))
                    fromIndex = parseInt(index)
                else if (toId == keyExtractor(item))
                    toIndex = parseInt(index)

                if (typeof fromIndex != 'undefined' &&
                    typeof toIndex != 'undefined')
                    break
            }

            if (typeof fromIndex == 'undefined' ||
                typeof toIndex == 'undefined')
                return

            const sorce = data[fromIndex]
            data.splice(fromIndex, 1)
            data.splice(toIndex, 0, sorce)

            LayoutAnimation.configureNext({
                ...LayoutAnimation.Presets.easeInEaseOut,
                duration: 150
            })

            setData(data)
            if (!dragId)
                setDragId(fromId)
        }

        const commit = ()=>{
            const { dragId, keyExtractor, onSortEnd, propsData, data } = latest.current

            const from = propsData.findIndex(item=>
                keyExtractor(item) == dragId
            )
            
            const to = data.findIndex(item=>
                keyExtractor(item) == dragId
            )

            onSortEnd({ from, to })

            reset()
        }

        const reset = ()=>{
            const { propsData, data } = latest.current

            if (data != propsData) {
                setData(propsData)
                setDragId(null)
            }
        }

        return { change, commit, reset }
    })

    return { dragId, data, reorder }
}

export default (Component)=>
    function SortableFlatListWrapper(props) {
        return (
            <Component 
                {...props}
                {...useReorder(props)} />
        )
    }