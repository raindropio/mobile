import React from 'react'
import PropTypes from 'prop-types'
import Goto from 'co/common/goto'

export default class Tag extends React.PureComponent {
	static propTypes = {
		name: PropTypes.string,
		count: PropTypes.number,

		onItemTap: PropTypes.func, //on tap on tag
		onRemoveTag: PropTypes.func, //on remove tag
		onEditTag: PropTypes.func, //on edit tag
	}

	onPress = ()=>{
		setTimeout(()=>this.props.onItemTap(this.props.name),0)
	}

	onActionPress = ()=>{
		this.props.onEditTag(this.props.name)
	}

	render() {
		const {name, count} = this.props
		return (
			<Goto 
				label={name}
				subLabel={count}
				action='more'
				onActionPress={this.onActionPress}
				onPress={this.onPress} />
		)
	}
}