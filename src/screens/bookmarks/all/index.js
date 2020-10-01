import React from 'react'
import _ from 'lodash-es'
import { Platform } from 'react-native'
import t from 't'
import { connect } from 'react-redux'
import Navigation from 'modules/navigation'
import SpaceContainer from 'co/bookmarks/items'

class BookmarksAllScreen extends React.Component {
	static options = ()=>({
		topBar: {
			title: {
				component: {
					name: 'bookmarks/title',
					alignment: Platform.OS == 'ios' ? 'center' : 'fill',

					passProps: {
						spaceId: 0,
						text: _.capitalize(t.s('bookmarks'))
					}
				}
			},

			rightButtons: [{
				...Platform.select({
					ios: {
						systemItem: 'add',
					},
					android: {
						icon: require('assets/images/add.png'),
					},
				}),
				id: 'add'
			}]
		},
		bottomTab: {
			icon: require('assets/images/tab/recent.png'),
			selectedIcon: require('assets/images/tab/recent.png'),
			text: _.capitalize(t.s('bookmarks'))
		}
	})

	firstLoad = true

	_navigationEvents = Navigation.events().bindComponent(this)
	componentWillUnmount() { this._navigationEvents && this._navigationEvents.remove() }

	componentDidAppear() {
		if (this.firstLoad){
			this.firstLoad = false
			this.props.loadBookmarks(0, { sort: this.props.default_sort })
		}
	}
	
	render() {
		return (
			<SpaceContainer key='0' spaceId='0' hideHead={true} componentId={this.props.componentId} />
		)
	}
}

export default connect(
	state=>({
		default_sort: state.config.raindrops_sort
	}),
	{
		loadBookmarks: require('data/actions/bookmarks').load,
		setLastCollection: require('data/actions/config').setLastCollection
	}
)(BookmarksAllScreen)