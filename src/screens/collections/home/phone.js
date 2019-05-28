import React from 'react'
import t from 't'
import _ from 'lodash'
import Navigation from 'modules/navigation'
import Events from 'modules/events'
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

	componentDidMount() {
		Events.on('create-collection', this.onCreateNew)
		_navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		Events.off('create-collection', this.onCreateNew)
		this._navigationEvents && this._navigationEvents.remove()
	}

	componentDidAppear() {
		this.props.setLastCollection(0)
	}

	focusThisTab = async()=>{
		await Navigation.mergeOptions(this.props, {
            bottomTabs: {
                currentTabIndex: 0
            }
		})
	}

	onItemTap = async(item)=>{
		await Navigation.push(this.props, 'bookmarks/browse', {spaceId: item._id})
	}

	onCreateNew = async(item)=>{
		await this.focusThisTab()

		if (!Number.isInteger(item.parentId))
			await Navigation.popToRoot(this.props)
		
		await Navigation.showModal(this.props, 'collection/add', {
			...item,
			onSuccess: this.onItemTap
		})
	}

	render() {
		return (
			<TreeContainer 
				componentId={this.props.componentId}
				options={options}
				
				onItemTap={this.onItemTap}
				onCreateNew={this.onCreateNew} />
		)
	}
}

export default connect(
	()=>({}),
	{
		setLastCollection: require('data/actions/config').setLastCollection
	}
)(HomeScreen)