import { useRef, useMemo, useState, useCallback } from 'react';
import { Platform } from 'react-native'
import { btoa } from 'react-native-quick-base64'
import { useAnimatedStyle } from 'react-native-reanimated'
import { PREVIEW_URL, API_ENDPOINT_URL } from 'data/constants/app'
import { useSelector } from 'react-redux'
import { useTheme } from 'styled-components'

import HighlightWebView from 'co/highlights/webview'
import { HorizontalPreloader } from './style'
import useError from './useError'

export default function OpenInternalWebView({ bookmark: { _id, link }, view, navigation }) {
    const ref = useRef(null)

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
    const onError = useError(ref, navigation)
    const progressStyle = useAnimatedStyle(() => ({transform: [{ scaleX: progress }]}), [progress])
    const webViewStyle = useMemo(()=>(progress && view=='web' ? undefined : {backgroundColor: 'transparent'}), [progress==1, view])

    return (
        <HighlightWebView
            outerRef={ref}

            //highlighting
            enabled={view == 'web'}
            bookmarkId={_id}

            //source
            source={source}
            cacheMode='LOAD_CACHE_ELSE_NETWORK'
            sharedCookiesEnabled={view != 'web'}
            setSupportMultipleWindows={false}

            //loading
            onLoadProgress={onLoadProgress}
            onError={onError}
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