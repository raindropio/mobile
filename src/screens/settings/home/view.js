import React from 'react'
import Navigation from 'modules/navigation'
import _ from 'lodash-es'
import {Linking, Platform} from 'react-native'
import t from 't'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from 'data/actions/user'
import * as localActions from 'local/actions'
import { isPro, user } from 'data/selectors/user'

import browsersList from 'assets/browsers'
import { themes } from 'co/style/colors'
import Form from './form'

class SettingsContainer extends React.PureComponent {
	componentDidMount() {
		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentDidAppear() {
		this.props.actions.user.refresh()
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}

	onLogout = ()=>{
		this.props.actions.user.logout()
	}

	onTheme = ()=>{
		const options = _.map(themes, ({name}, id)=>({
			id,
			label: name
		}))

		Navigation.push(this.props, 'misc/picker', {
			options,
			selected: this.props.theme,
			title: t.s('interfaceStyle'),
			onSelect: this.props.actions.local.setTheme
		})
	}

	onPro = ()=>{
		Navigation.showModal(this.props, 'settings/pro/status')
	}

	onProfile = ()=>{
		Navigation.push(this.props, 'misc/browser', {
			title: t.s('profile'),
			link: 'https://raindrop.io/app/#/settings/profile'
		})
	}

	onHowTo = ()=>{
		Navigation.push(this.props, 'misc/browser', {
			link: 'https://help.raindrop.io/category/24-mobile-app',
			replaceTitle: true
		})
	}

	onHelp = ()=>{
		Navigation.push(this.props, 'misc/browser', {
			link: 'https://help.raindrop.io/contact',
			replaceTitle: true
		})
	}

	onBrowser = ()=>{
		Navigation.push(this.props, 'misc/picker', {
			options: browsersList,
			selected: this.props.browser,
			title: t.s('openInBrowser'),
			onSelect: this.props.actions.local.setBrowser
		})
	}

	onCollectionsSort = ()=>{
		Navigation.push(this.props, 'collections/reorder')
	}

	onFiles = ()=>{
		Navigation.push(this.props, 'settings/files')
	}

	onDesktop = ()=>{
		Navigation.push(this.props, 'misc/browser', {
			link: 'https://help.raindrop.io/article/35-web-and-desktop-app',
			replaceTitle: true
		})
	}

	render() {
		return (
			<Form 
				{...this.props} 
				onTheme={this.onTheme}
				onPro={this.onPro}
				onProfile={this.onProfile}
				onHowTo={this.onHowTo}
				onHelp={this.onHelp}
				onLogout={this.onLogout}
				onBrowser={this.onBrowser}
				onCollectionsSort={this.onCollectionsSort}
				onFiles={this.onFiles}
				onDesktop={this.onDesktop} />
		)
	}
}

export default connect(
	(state)=>({
		theme: state.local.theme,
		browser: state.local.browser,
		user: user(state),
		isPro: isPro(state)
	}),
	(dispatch)=>({
		actions: {
			user: bindActionCreators(userActions, dispatch),
			local: bindActionCreators(localActions, dispatch)
		}
	})
)(SettingsContainer)