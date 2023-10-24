import { PureComponent } from 'react';
import { mediumFade } from 'co/style/animation'

import View from './view'

class GroupItemContainer extends PureComponent {
	onItemPress = ()=>{
		this.props.onItemPress(this.props)
	}

	onToggle = ()=>{
		mediumFade()
		this.props.groupToggle(this.props._id)
	}

	onAdd = ()=>
		this.props.navigation.navigate('collection/add', {
			parentId: this.props._id,
			onSuccess: this.props.onItemPress
		})

	onMore = ()=>
		this.props.navigation.navigate('group/edit', { _id: this.props._id })

	render() {
		return (
			<View 
				{...this.props} 
				onToggle={this.onToggle} 
				onAdd={this.onAdd} 
				onMore={this.onMore} 
				onItemPress={this.onItemPress} />
		)
	}
}

export default GroupItemContainer