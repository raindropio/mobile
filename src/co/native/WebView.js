import React from 'react'
import styled from 'styled-components/native'
import { WebView as NativeWebView } from 'react-native-webview'
import { ActivityIndicator } from './ActivityIndicator'

const Loading = styled(ActivityIndicator)`
	position: absolute;
	left:0;right:0;bottom:0;top:0;
	align-items: center;
	justify-content: center;
`

export const WebView = styled(NativeWebView).attrs({
	startInLoadingState: true,
    allowsInlineMediaPlayback: true,
    thirdPartyCookiesEnabled: true,
    sharedCookiesEnabled: true,
    useWebKit: true,
    
    renderLoading: ()=><Loading />
})`
	flex:1;
	background-color: white;
`