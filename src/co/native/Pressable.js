import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { RectButton, State } from 'react-native-gesture-handler'

const Touch = styled(RectButton).attrs(({theme})=>({
	underlayColor: theme.text.regular
}))``

let timeout = null
let longPressed = false

export function Pressable({ onPress, onLongPress, delayLongPress=300, ...etc }) {
    const onHandlerStateChange = useCallback(({ nativeEvent: { state } })=>{
        clearTimeout(timeout)
        
        if (state == State.ACTIVE && onLongPress)
            timeout = setTimeout(()=>{
                onLongPress()
                longPressed = true
            }, delayLongPress)

        if (state == State.END && !longPressed)
            onPress()

        longPressed = false
    }, [onPress, onLongPress, delayLongPress])

    return (
        <Touch 
            {...etc}
            onHandlerStateChange={onHandlerStateChange} />
    )
}