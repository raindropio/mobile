import t from 't'
import React from 'react'
import { Platform } from 'react-native'
import _ from 'lodash'
import Navigation from 'modules/navigation'
import SpaceContainer from 'co/bookmarks/items'
import color from 'co/collections/utils/color'
import { connect } from 'react-redux'

const getOptions = ({ spaceId })=>({
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

class SpaceScreen extends React.Component {
	static options = getOptions

	_navigationEvents = Navigation.events().bindComponent(this)
	componentWillUnmount() { this._navigationEvents && this._navigationEvents.remove() }

	componentDidAppear() {
		this.props.setLastCollection(this.props.spaceId)
	}

	componentDidMount() {
		this.loadSpace()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.spaceId != this.props.spaceId){
			Navigation.mergeOptions(this.props, getOptions(this.props))
			setTimeout(this.loadSpace, 1)
		}
	}

	loadSpace = ()=>{
		this.props.loadBookmarks(this.props.spaceId, { sort: this.props.default_sort })
	}

	render() {
		return (
			<SpaceContainer 
				key={this.props.spaceId}
				spaceId={this.props.spaceId}
				componentId={this.props.componentId} />
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
)(SpaceScreen)