import React from 'react'
import {
	LogoTextView,
	LogoTextImage
} from './style'

export default class LogoText extends React.PureComponent {
	render() {
		return (<LogoTextView>
			<LogoTextImage source={require('assets/images/logoText.png')} />
		</LogoTextView>)
	}
}