import { useCallback } from 'react'

/*
    useMessage((type, payload)=>{}, [])
*/
export function useMessageEffect(onMessage, deps) {
    return useCallback(({ nativeEvent })=>{
        const data = JSON.parse(nativeEvent.data)
        if (typeof data != 'object' || typeof data.type != 'string') return
        const { type, payload } = data
        onMessage(type, payload)
    }, deps)
}

/*
    const send = useSend(ref)
    send('some_type', {payload...})
*/
export function useSendCallback(ref) {
    return useCallback((type, payload) => {
        if (ref.current)
            ref.current.injectJavaScript(`window.ReactNativeWebViewSendMessage(${JSON.stringify({ type, payload })}); true`)
    }, [ref])
}