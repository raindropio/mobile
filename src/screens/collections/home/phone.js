import React from 'react'
import t from 't'
import _ from 'lodash'
import { Platform } from 'react-native'
import Navigation from 'modules/navigation'
import TreeContainer from 'co/collections/items'
import buttons from 'co/collections/items/buttons'
import { connect } from 'react-redux'

const options = {
	hideIds: [0]
}

class HomeScreen extends React.Component {
	static options() {
		return {
			topBar: {
				title: {
					text: _.capitalize(t.s('collectionsCount'))
				},
				...buttons
			},
			bottomTab: {
				icon: require('assets/images/tab/home.png'),
				text: _.capitalize(t.s('collectionsCount'))
			}
		}
	}

	_navigationEvents = Navigation.events().bindComponent(this)
	componentWillUnmount() { this._navigationEvents && this._navigationEvents.remove() }

	componentDidAppear() {
		this.props.setLastCollection(0)
	}

	onItemTap = (item)=>{
		Navigation.push(this.props, 'bookmarks/home', {spaceId: item._id})
	}

	render() {
		return (
			<TreeContainer 
				componentId={this.props.componentId}
				options={options}
				onItemTap={this.onItemTap} />
		)
	}
}

export default connect(
	()=>({}),
	{
		setLastCollection: require('data/actions/config').setLastCollection
	}
)(HomeScreen)