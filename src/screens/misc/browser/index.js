import React from 'react'
import WebView from 'co/common/webview'

class BrowserScreen extends React.PureComponent {
	static options = ({title})=>({
		topBar: {
			noBorder: false,
			borderHeight: 1,
			title: {
				text: title
			}
		}
	})

	render() {
		return (
			<WebView 
				link={this.props.link}
				replaceTitle={this.props.replaceTitle}
				componentId={this.props.componentId} />
		)
	}
}

export default BrowserScreen