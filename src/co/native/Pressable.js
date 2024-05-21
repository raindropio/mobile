import { useCallback } from 'react';
import { RectButton, State } from 'react-native-gesture-handler'

let timeout = null
let result = ''

export function Pressable({ onPress, onLongPress, delayLongPress=300, ...etc }) {
    const onHandlerStateChange = useCallback(({ nativeEvent: { state } })=>{
        clearTimeout(timeout)

        switch(state){
            case State.BEGAN:
            case State.ACTIVE:
                result = ''
        
            if (onLongPress)
                timeout = setTimeout(()=>{
                    onLongPress()
                    result = 'long-press'
                }, delayLongPress)
            break

            case State.END:
                if (!result) {
                    onPress()
                    result = 'press'
                }
            break
        }
    }, [onLongPress, delayLongPress])

    return (
        <RectButton 
            shouldCancelWhenOutside={true}
            disallowInterruption={true}
            shouldActivateOnStart={false}
            {...etc}
            onHandlerStateChange={onHandlerStateChange} />
    )
}