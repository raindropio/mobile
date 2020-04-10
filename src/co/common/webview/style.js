import 'react-native-get-random-values'
import styled from 'styled-components/native'
import { WebView as NativeWebView } from 'react-native-webview'
import { themed } from 'co/style/colors'

export const WebView = styled(NativeWebView).attrs({
	startInLoadingState: true,
	allowsInlineMediaPlayback: true
})`
	flex:1;
	background-color: white;
`

export const ActivityIndicator = styled.ActivityIndicator`
	position: absolute;
	left:0;right:0;bottom:0;top:0;
	align-items: center;
	justify-content: center;
`