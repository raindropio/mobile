import React from 'react'
import Navigation from 'modules/navigation'
import { WebView, ActivityIndicator } from './style'

export default class WebViewComponent extends React.PureComponent {
	onNavigationStateChange = ({title, canGoBack, canGoForward, loading})=>{
		if (this.props.replaceTitle && this.props.componentId && title)
			Navigation.mergeOptions(this.props, {
				topBar: {
					title: {
						text: title
					}
				}
			})
	}

	loadingView = ()=><ActivityIndicator />

	render() {
		const {link} = this.props

		return (
			<WebView
				source={{uri:link}}
				renderLoading={this.loadingView}
				thirdPartyCookiesEnabled={true}
				sharedCookiesEnabled={true}
				useWebKit={true}
				onNavigationStateChange={this.onNavigationStateChange} />
		)
	}
}