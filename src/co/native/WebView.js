import React from 'react'
import styled from 'styled-components/native'
import { Linking } from 'react-native'
import { WebView as NativeWebView } from 'react-native-webview'
import { ActivityIndicator } from './ActivityIndicator'

const Loading = styled(ActivityIndicator)`
	position: absolute;
	left:0;right:0;bottom:0;top:0;
	align-items: center;
	justify-content: center;
`

export const WebView = styled(NativeWebView).attrs(({onShouldStartLoadWithRequest})=>({
	applicationNameForUserAgent: 'RaindropMobile',

	startInLoadingState: true,
    allowsInlineMediaPlayback: true,
    thirdPartyCookiesEnabled: true,
    sharedCookiesEnabled: true,
	useWebKit: true,
	javaScriptCanOpenWindowsAutomatically: true,
    
	renderLoading: ()=><Loading />,
	
	onShouldStartLoadWithRequest: (r)=>{
		if (typeof onShouldStartLoadWithRequest == 'function' &&
			!onShouldStartLoadWithRequest(r))
			return false

		const { navigationType, url } = r

		if (navigationType == 'click'){
			Linking.openURL(url)
			return false
		}

		return true
	}
}))`
	flex:1;
	background-color: transparent;
`