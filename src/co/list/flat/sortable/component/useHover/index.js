import { useState } from 'react'
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated'

const precise = 24

export default function useHover({ selected, windowX, windowY, measure }) {
    const [refresh,setRefresh] = useState(null)

    useAnimatedReaction(
        ()=>!selected || parseInt((windowX.value + windowY.value)/precise),
        (result, previous)=>{
            if (result == previous) return
            runOnJS(setRefresh)(windowX.value+windowY.value)
            return
        },
        [selected, windowX, windowY]
    )

    if (!selected) return

    const id = measure.findId({ x: windowX.value, y: windowY.value })
    
    return selected != id ? id : undefined
}