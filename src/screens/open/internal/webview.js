import React, { useMemo, useState, useCallback } from 'react'
import { Platform } from 'react-native'
import { btoa } from 'react-native-quick-base64'
import { useAnimatedStyle } from 'react-native-reanimated'
import { PREVIEW_URL, API_ENDPOINT_URL } from 'data/constants/app'
import { useSelector } from 'react-redux'
import { useTheme } from 'styled-components'

import { WebView } from 'react-native-webview'
import { HorizontalPreloader } from './style'

export default function OpenInternalWebView({ bookmark: { _id, link }, view }) {
    //appearance
    const { font_size, font_family } = useSelector(state=>state.config)
    const { dark } = useTheme()

    //source
    const source = useMemo(()=>{
        switch(view) {
            case 'cache':   return { uri: `${API_ENDPOINT_URL}raindrop/${_id}/cache` }
            case 'article': return { uri: PREVIEW_URL+'/article/'+btoa(link)+`#solid-bg=false&theme=${dark?'night':'day'}&font-family=${encodeURIComponent(font_family)}&font-size=${font_size}` }
            case 'embed':   return { uri: PREVIEW_URL+'/embed/'+btoa(link)+`?platform=${Platform.OS}` }
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
            forceDarkOn={dark}

            //loading
            onLoadProgress={onLoadProgress}
            startInLoadingState={true}
            renderLoading={()=><HorizontalPreloader style={progressStyle} />}
            style={webViewStyle}

            //gestures
            allowsBackForwardNavigationGestures
            pullToRefreshEnabled={view != 'embed'}
            overScrollMode='content'
            automaticallyAdjustsScrollIndicatorInsets
            bounces={view != 'embed'}
            decelerationRate={Platform.select({ios:'normal', default:'fast'})}

            //media
            autoManageStatusBarEnabled
            allowsFullscreenVideo
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction />
    )
}