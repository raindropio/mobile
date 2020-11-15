import React from 'react'
import { mediumFade } from 'co/style/animation'

import View from './view'

class GroupItemContainer extends React.PureComponent {
	onItemTap = ()=>{
		this.props.onItemTap(this.props)
	}

	onToggle = ()=>{
		//mediumFade()
		this.props.groupToggle(this.props._id)
	}

	onAdd = ()=>
		this.props.navigation.navigate('collection', { screen: 'add', params: { parentId: this.props._id } })

	onMore = ()=>
		this.props.navigation.navigate('group', { _id: this.props._id })

	render() {
		return (
			<View 
				{...this.props} 
				onToggle={this.onToggle} 
				onAdd={this.onAdd} 
				onMore={this.onMore} 
				onItemTap={this.onItemTap} />
		)
	}
}

export default GroupItemContainer