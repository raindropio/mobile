import t from 't'
import React from 'react'
import { Platform } from 'react-native'
import _ from 'lodash'
import Navigation from 'modules/navigation'
import SpaceContainer from 'co/bookmarks/items'
import color from 'co/collections/utils/color'
import { connect } from 'react-redux'

class SpaceScreen extends React.Component {
	static options = ({ spaceId })=>({
		tintColor: color(spaceId),

		topBar: {
			title: {
				component: {
					name: 'bookmarks/title',
					alignment: Platform.OS == 'ios' ? 'center' : 'fill',

					passProps: {
						spaceId
					}
				}
			},

			rightButtons: [
				...(
					spaceId != -99 ? [{
						...Platform.select({
							ios: {
								systemItem: 'add',
							},
							android: {
								icon: require('assets/images/add.png'),
							},
						}),
						id: 'add'
					}]: []
				), {
				...Platform.select({
					ios: {
						systemItem: 'search',
					},
					android: {
						icon: require('assets/images/search.png'),
					},
				}),
				id: 'search'
			}]
		},
		
		bottomTab: {
			icon: require('assets/images/tab/home.png'),
			text: _.capitalize(t.s('collectionsCount'))
		}
	})

	_navigationEvents = Navigation.events().bindComponent(this)
	componentWillUnmount() { this._navigationEvents && this._navigationEvents.remove() }

	componentDidAppear() {
		this.props.setLastCollection(this.props.spaceId)
	}

	render() {
		return (
			<SpaceContainer 
				spaceId={this.props.spaceId}
				componentId={this.props.componentId} />
		)
	}
}

export default connect(
	()=>({}),
	{
		setLastCollection: require('data/actions/config').setLastCollection
	}
)(SpaceScreen)