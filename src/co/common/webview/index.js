import React from 'react'
import { WebView, ActivityIndicator } from './style'

export default class WebViewComponent extends React.PureComponent {
	loadingView = ()=><ActivityIndicator />

	render() {
		const {link} = this.props

		return (
			<WebView
				source={{uri:link}}
				renderLoading={this.loadingView}
				thirdPartyCookiesEnabled={true}
				sharedCookiesEnabled={true}
				useWebKit={true} />
		)
	}
}