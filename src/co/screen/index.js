import React from 'react'
import { Platform } from 'react-native'
import _ from 'lodash'

import Navigation from 'modules/navigation'
import { Provider } from 'react-redux'
import { store } from 'data'

import { ThemeProvider } from 'styled-components'
import { currentTheme, themeIsDark } from 'co/style/colors'

export default (Screen) => class ScreenBaseWrap extends React.Component {
	static defaultProps = Screen.defaultProps

	//RNN options
	static options = (props)=>{
		const isModal = (props.isModal || (Screen.defaultProps||{}).isModal)
		const original = Screen.options ? Screen.options(props) : {}
		const extended = []

		//Screen style
		if (original.style)
			(Array.isArray(original.style) ? original.style : [original.style]).forEach(style=>{
				switch(style) {
					case 'form': extended.push(require('./styles/form').default(original))
				}
			})
		
		//Is modal
		if (isModal)
			extended.push(require('./styles/modal').default(original))

		//Apply tintColor if screen is not dark
		if (original.tintColor && !themeIsDark()){
			extended.push({
				topBar: {
					backButton: {color: original.tintColor},
					leftButtonColor: original.tintColor,
					rightButtonColor: original.tintColor,
				}
			})
		}

		if (extended.length)
			return _.merge(original, ...extended)

		//Remove styles for old phones
		if (original.statusBar && original.statusBar.backgroundColor)
			if (Platform.OS=='android' && Platform.Version < 23)
				delete original.statusBar.backgroundColor

		return original
	}

	//RNN button
	navigationButtonPressed({buttonId}) {
		switch(buttonId) {
			case 'cancel':
				Navigation.close(this.props)
			break
		}
	}

	//Lifecycle
	componentDidMount() {
		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}

	constructor(props) {
		super(props)

		const original = (Screen.options ? Screen.options(props) : {})

		//Styled components theme
		this.theme = {
			name: currentTheme,
			fontSize: 'normal',
			tintColor: original.tintColor,
			
			...(original.layout && original.layout.backgroundColor ? {
				backgroundColor: original.layout.backgroundColor
			} : {}),

			...(themeIsDark() ? {
				tintColor: '',
				dark: true
			} : {})
		}
	}

	render() {
		return (
			<Provider store={store}>
				<ThemeProvider theme={this.theme}>
					<Screen {...this.props} />
				</ThemeProvider>
			</Provider>
		)
	}
}