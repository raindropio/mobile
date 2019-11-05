import React from 'react'
import Navigation from 'modules/navigation'
import Events from 'modules/events'
import TreeContainer from 'co/collections/items'
import buttons from 'co/collections/items/buttons'
import { themed } from 'co/style/colors'
import { connect } from 'react-redux'
import { detailScreenId } from 'root/app/ipad'

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

	state = {
		selectedId: this.props.selectedId
	}

	componentDidMount() {
		Events.on('create-collection', this.onCreateNew)
		_navigationEvents = Navigation.events().bindComponent(this)
	}

	componentWillUnmount() {
		Events.off('create-collection', this.onCreateNew)
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
		this.setState({ selectedId: item._id })
		try{Navigation.popToRoot({componentId: 'detail-stack'})}catch(e){}
		Navigation.updateProps({ componentId: detailScreenId }, { spaceId: item._id })
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
				{...this.state}
				onItemTap={this.onItemTap}
				onCreateNew={this.onCreateNew} />
		)
	}
}

export default connect(
	(state)=>({
		selectedId: state.config.last_collection
	})
)(iPadScreen)