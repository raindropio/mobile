import { useCallback } from 'react';
import styled from 'styled-components/native'
import { RectButton, State } from 'react-native-gesture-handler'

const Touch = styled(RectButton).attrs(({theme})=>({
	underlayColor: theme.text.regular
}))``

let timeout = null
let result = ''

export function Pressable({ onPress, onLongPress, delayLongPress=300, ...etc }) {
    const onMyPress = useCallback(()=>{
        if (!result){
            onPress()
            result = 'press'
        }
    }, [onPress])

    const onHandlerStateChange = useCallback(({ nativeEvent: { state } })=>{
        clearTimeout(timeout)

        if (state == State.BEGAN ||
            state == State.ACTIVE){
            result = ''
        
            if (onLongPress)
                timeout = setTimeout(()=>{
                    onLongPress()
                    result = 'long-press'
                }, delayLongPress)
        }
    }, [onLongPress, delayLongPress])

    return (
        <Touch 
            {...etc}
            onPress={onMyPress}
            onHandlerStateChange={onHandlerStateChange} />
    )
}