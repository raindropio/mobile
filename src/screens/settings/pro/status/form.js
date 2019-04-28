import React from 'react'
import t from 't'
import WebView from 'co/common/webview'
import { isExtension } from 'modules/native'

import { ButtonAction } from 'co/common/button'
import {
	Wrap
} from './style'

export default class ProStatus extends React.PureComponent {
	state = {
		showButton: false
	}

	async componentDidMount() {
		this.setState({
			showButton: !(await isExtension())
		})
	}

	render() {
		const {
			isPro,
			onBuy
		} = this.props;

		return (
			<Wrap>
				<WebView
					link={'https://raindrop.io/static/pro?frame=1&pro=1'} />

				{this.state.showButton && <ButtonAction onPress={onBuy}>{t.s(isPro? 'renewPro' : 'goToPRO')}</ButtonAction>}
			</Wrap>
		)
	}
}