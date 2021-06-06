import { useState, useEffect } from 'react'
import { runOnJS, useAnimatedReaction, useAnimatedProps } from 'react-native-reanimated'

const precise = 24

export default function useHover({ selected, absoluteX, absoluteY, measure }) {
    const [refresh,setRefresh] = useState(null)

    useAnimatedReaction(
        ()=>!selected || parseInt((absoluteX.value + absoluteY.value)/precise),
        (result, previous)=>{
            if (result == previous) return
            runOnJS(setRefresh)(absoluteX.value+absoluteY.value)
            return
        },
        [selected, absoluteX, absoluteY]
    )

    if (!selected) return

    const id = measure.findId({ x: absoluteX.value, y: absoluteY.value })
    
    return selected != id ? id : undefined
}