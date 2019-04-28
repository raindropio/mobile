import React from 'react'
import Navigation from 'modules/navigation'
import TreeContainer from 'co/collections/items'
import buttons from 'co/collections/items/buttons'
import { themed } from 'co/style/colors'

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

	constructor(props) {
		super(props)

		this.state = {
			selectedId: this.props.spaceId
		}
	
		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		this.props.actions.collections.draftCommit(this.props.item._id)
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
		if (item._id == this.state.selectedId)
			return;
			
		Navigation.setStackRoot('detail', [Navigation.getComponent('bookmarks/home', {spaceId: item._id})])
		this.setState({selectedId: item._id})
	}

	render() {
		return (
			<TreeContainer 
				componentId={this.props.componentId}
				resetLastCollectionId={true}
				options={this.state}
				onItemTap={this.onItemTap} />
		)
	}
}

export default iPadScreen