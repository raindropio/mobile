import React, { useMemo, useState, useCallback } from 'react'
import { btoa } from 'react-native-quick-base64'
import { useAnimatedStyle } from 'react-native-reanimated'
import { PREVIEW_URL, API_ENDPOINT_URL } from 'data/constants/app'
import { useSelector } from 'react-redux'

import { WebView } from 'react-native-webview'
import { HorizontalPreloader } from './style'

export default function OpenInternalWebView({ bookmark: { _id, link }, view }) {
    //appearance
    const { font_size, font_family } = useSelector(state=>state.config)

    //source
    const source = useMemo(()=>{
        switch(view) {
            case 'cache':   return { uri: `${API_ENDPOINT_URL}raindrop/${_id}/cache` }
            case 'article': return { uri: PREVIEW_URL+'/article/'+btoa(link)+`#solid-bg=false&font-family=${encodeURIComponent(font_family)}&font-size=${font_size}` }
            case 'embed':   return { uri: PREVIEW_URL+'/embed/'+btoa(link) }
            default:        return { uri: link }
        }
    }, [_id, view, link, font_family, font_size])

    //progress
    const [progress, setProgress] = useState(0)
    const onLoadProgress = useCallback(({ nativeEvent })=>setProgress(nativeEvent.progress), [])
    const progressStyle = useAnimatedStyle(() => ({transform: [{ scaleX: progress }]}), [progress])
    const webViewStyle = useMemo(()=>(progress && view=='web' ? undefined : {backgroundColor: 'transparent'}), [progress==1, view])

    return (
        <WebView
            //source
            source={source}
            cacheMode='LOAD_CACHE_ELSE_NETWORK'
            sharedCookiesEnabled={view != 'web'}

            //loading
            onLoadProgress={onLoadProgress}
            startInLoadingState={true}
            renderLoading={()=><HorizontalPreloader style={progressStyle} />}
            style={webViewStyle}

            //gestures
            allowsBackForwardNavigationGestures={true}
            pullToRefreshEnabled={view != 'embed'}
            overScrollMode='content'
            bounces={view != 'embed'}
            decelerationRate='normal'

            //media
            autoManageStatusBarEnabled={true}
            allowsFullscreenVideo={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false} />
    )
}