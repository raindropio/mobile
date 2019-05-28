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

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'logout':
				this.props.actions.user.logout()
			break
		}
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
		Navigation.openURL(this.props, {
			link: 'https://help.raindrop.io/category/24-mobile-app'
		})
	}

	onHelp = ()=>{
		Navigation.openURL(this.props, {
			link: 'https://help.raindrop.io/contact'
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
		Navigation.openURL(this.props, {
			link: 'https://help.raindrop.io/article/35-web-and-desktop-app',
			readerMode: true
		})
	}

	onImport = ()=>{
		Navigation.openURL(this.props, {
			link: 'https://help.raindrop.io/article/17-importing-bookmarks',
			readerMode: true
		})
	}

	onBackup = ()=>{
		Navigation.push(this.props, 'misc/browser', {
			title: t.s('cloudBackup'),
			link: 'https://raindrop.io/app/#/settings/integrations'
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
				onBrowser={this.onBrowser}
				onCollectionsSort={this.onCollectionsSort}
				onFiles={this.onFiles}
				onDesktop={this.onDesktop}
				onImport={this.onImport}
				onBackup={this.onBackup} />
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