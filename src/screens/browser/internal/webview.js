import { useRef, useMemo, useState, useCallback } from 'react';
import { Platform } from 'react-native'
import { useAnimatedStyle } from 'react-native-reanimated'
import { API_ENDPOINT_URL } from 'data/constants/app'
import { useSelector } from 'react-redux'
import { useTheme } from 'styled-components/native'

import HighlightWebView from 'co/highlights/webview'
import { HorizontalPreloader } from './style'
import useError from './useError'

export default function OpenInternalWebView({ bookmark: { _id, link, type }, view, navigation }) {
    const ref = useRef(null)

    //appearance
    const { font_size, font_family } = useSelector(state=>state.config)
    const { dark } = useTheme()

    //source
    const source = useMemo(()=>{
        switch(view) {
            case 'cache':
                return { uri: `${API_ENDPOINT_URL}raindrop/${_id}/cache` }
            case 'article':
            case 'embed':
                return { uri: `${API_ENDPOINT_URL}raindrop/preview/${_id}?platform=android&type=${type}#solid-bg=false&theme=${dark?'night':'day'}&font-family=${encodeURIComponent(font_family)}&font-size=${font_size}` }
            default:
                return { uri: link }
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