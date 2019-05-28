import React from 'react'
import Navigation from 'modules/navigation'
import TreeContainer from 'co/collections/items'
import buttons from 'co/collections/items/buttons'
import { themed } from 'co/style/colors'
import { connect } from 'react-redux'

class iPadScreen extends React.Component {
	static options() {
		return {
			topBar: {
				background: {
					color: themed.mainAlt()
				},
				title: {
					component: {
						name: 'component/logoText',
						alignment: 'center'
					}
				},
				...buttons,
				leftButtons: [
					{
						id: 'settings',
						icon: require('assets/images/settings.png')
					}
				]
			},
			layout: {
				backgroundColor: themed.mainAlt()
			}
		}
	}

	componentDidMount() {
		Events.on('create-collection', this.onCreateNew)
		Events.on('browse-collection', this.onItemTap)
		_navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		Events.off('create-collection', this.onCreateNew)
		Events.off('browse-collection', this.onItemTap)
		this._navigationEvents && this._navigationEvents.remove()
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'settings':
				Navigation.showModal(this.props, 'settings/home')
			break
		}
	}

	onItemTap = (item)=>{
		if (item._id == this.props.selectedId)
			return;
		
		Navigation.setStackRoot('detail', [Navigation.getComponent('bookmarks/browse', {spaceId: item._id})])
	}

	onCreateNew = (item)=>{
		Navigation.showModal(this.props, 'collection/add', {
			...item,
			onSuccess: this.onItemTap
		})
	}

	render() {
		return (
			<TreeContainer 
				{...this.props}
				onItemTap={this.onItemTap}
				onCreateNew={this.onCreateNew} />
		)
	}
}

export default connect(
	(state)=>({
		selectedId: state.config.lastCollection
	})
)(iPadScreen)