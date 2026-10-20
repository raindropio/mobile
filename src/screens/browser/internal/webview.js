import { useRef, useState, useEffect } from 'react'
import { useAnimatedStyle } from 'react-native-reanimated'
import { API_ENDPOINT_URL } from 'data/constants/app'
import { useSelector } from 'react-redux'
import { useTheme } from 'styled-components/native'

import HighlightWebView from 'co/highlights/webview'
import { HorizontalPreloader } from './style'
import useError from './useError'

const transparentStyle = { backgroundColor: 'transparent' }

function getSource({ _id, link, type }, view, { dark, font_family, font_size }) {
    switch(view) {
        case 'cache':
            return { uri: `${API_ENDPOINT_URL}raindrop/${_id}/cache` }
        case 'article':
        case 'embed':
            return { uri: `${API_ENDPOINT_URL}raindrop/preview/${_id}?platform=android&type=${type}#solid-bg=false&theme=${dark?'night':'day'}&font-family=${encodeURIComponent(font_family)}&font-size=${font_size}` }
        default:
            return { uri: link }
    }
}

export default function OpenInternalWebView({ bookmark: { _id, link, type }, view, navigation }) {
    const ref = useRef(null)

    //appearance
    const { font_size, font_family } = useSelector(state=>state.config)
    const { dark } = useTheme()

    //source
    const source = getSource({ _id, link, type }, view, { dark, font_family, font_size })

    //back gesture
    const [canGoBack, setCanGoBack] = useState(false)
    useEffect(() => navigation.addListener('beforeRemove', (e) => {
        if (!canGoBack) return
        e.preventDefault()
        ref.current?.goBack()
    }), [navigation, canGoBack])

    //progress
    const [progress, setProgress] = useState(0)
    const onLoadProgress = ({ nativeEvent })=>{
        setCanGoBack(nativeEvent.canGoBack)
        setProgress(nativeEvent.progress)
    }
    const onError = useError(ref, navigation)
    const progressStyle = useAnimatedStyle(() => ({transform: [{ scaleX: progress }]}))
    const webViewStyle = progress == 1 && view == 'web' ? undefined : transparentStyle

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
            pullToRefreshEnabled={true}

            //maybe fix select text issue on some devices?
            nestedScrollEnabled={true}
            overScrollMode='never'

            //media
            autoManageStatusBarEnabled
            allowsFullscreenVideo
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false} />
    )
}