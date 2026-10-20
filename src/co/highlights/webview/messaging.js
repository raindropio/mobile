import { useCallback } from 'react'

/*
    const onMessage = useMessageEffect((type, payload)=>{})
*/
export function useMessageEffect(onMessage) {
    return ({ nativeEvent })=>{
        const data = JSON.parse(nativeEvent.data)
        if (typeof data != 'object' || typeof data.type != 'string') return
        const { type, payload } = data
        onMessage(type, payload)
    }
}

/*
    const send = useSend(ref)
    send('some_type', {payload...})
*/
//stable: it's a dependency of effects that must only re-run on their own inputs
export function useSendCallback(ref) {
    return useCallback((type, payload) => {
        if (ref.current)
            ref.current.injectJavaScript(`window.ReactNativeWebViewSendMessage(${JSON.stringify({ type, payload })}); true`)
    }, [ref])
}