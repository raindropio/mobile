import { useState, useRef, useCallback, useEffect } from 'react'
import { Clipboard } from 'react-native'
import share from 'react-native-share'
import { useSelector, useDispatch } from 'react-redux'
import { isPro } from 'data/selectors/user'
import { highlights as getHighlights } from 'data/selectors/bookmarks'
import { oneLoad, highlightAdd, highlightUpdate, highlightRemove } from 'data/actions/bookmarks'

import libJs from 'assets/highlight.string'
import { WebView } from 'react-native-webview'
import { useMessageEffect, useSendCallback } from './messaging'

const injectedJavaScript = `${libJs}; true`
const menuItems = [
    { label: '🟡', key: 'yellow' },
    { label: '🔴', key: 'red' },
    { label: '🔵', key: 'blue' },
    { label: '🟢', key: 'green' },
    { label: '💬', key: 'note' },
    { label: 'Copy', key: 'copy' },
    { label: 'Share', key: 'share' },
]

export default function HighlightsWebView({ outerRef, enabled, bookmarkId, ...etc }) {
    const ref = outerRef || useRef(null)

    //state
    const [ready, setReady] = useState(false)
    const dispatch = useDispatch()
    const pro = useSelector(state=>isPro(state))
    const highlights = useSelector(state=>getHighlights(state, bookmarkId))

    //loading
    const onLoadStart = useCallback(()=>setReady(false), [])

    //messaging
    const send = useSendCallback(ref)

    const onMessage = useMessageEffect((type, payload)=>{
        switch(type) {
            case 'RDH_READY':   setReady(true); break
            case 'RDH_ADD':     dispatch(highlightAdd(bookmarkId, payload)); break
            case 'RDH_UPDATE':  dispatch(highlightUpdate(bookmarkId, payload._id, payload)); break
            case 'RDH_REMOVE':  dispatch(highlightRemove(bookmarkId, payload._id)); break
        }
    }, [bookmarkId, send])

    const onCustomMenuSelection = useCallback(({ nativeEvent: { key, selectedText } })=>{
        switch(key) {
            case 'yellow':
            case 'red':
            case 'blue':
            case 'green':
                send('RDH_ADD_SELECTION', { color: key })
            break

            case 'note':
                send('RDH_NOTE_SELECTION')
            break

            case 'copy':
                Clipboard.setString(selectedText)
            break

            case 'share':
                share.open({ message: selectedText }).catch(()=>{})
            break
        }
    }, [send])

    //effects
    useEffect(()=>{dispatch(oneLoad(bookmarkId))}, [bookmarkId])
    useEffect(()=>{
        if (!ready) return
        send('RDH_CONFIG', { enabled: true, pro, nav: true, hide_new_toolbar: true })
        send('RDH_APPLY', highlights)
    }, [ready, highlights, pro])

    return (
        <WebView 
            {...etc}
            ref={ref}
            injectedJavaScriptBeforeContentLoaded={enabled ? injectedJavaScript : undefined}
            onLoadStart={onLoadStart}
            onMessage={onMessage}
            menuItems={menuItems}
            onCustomMenuSelection={onCustomMenuSelection} />
    )
}