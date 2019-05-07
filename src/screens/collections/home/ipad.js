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

	_navigationEvents = Navigation.events().bindComponent(this)
	componentWillUnmount() { this._navigationEvents && this._navigationEvents.remove() }

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
			
		Navigation.setStackRoot('detail', [Navigation.getComponent('bookmarks/home', {spaceId: item._id})])
	}

	render() {
		return (
			<TreeContainer 
				{...this.props}
				onItemTap={this.onItemTap} />
		)
	}
}

export default connect(
	(state)=>({
		selectedId: state.config.lastCollection
	})
)(iPadScreen)