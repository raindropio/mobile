import React from 'react'
import PropTypes from 'prop-types'
import Goto from 'co/common/goto'

export default class Tag extends React.PureComponent {
	static propTypes = {
		_id: PropTypes.string,
		count: PropTypes.number,

		onItemTap: PropTypes.func, //on tap on tag
		onRemoveTag: PropTypes.func, //on remove tag
		onEditTag: PropTypes.func, //on edit tag
	}

	onPress = ()=>
		this.props.onItemTap(this.props._id)

	onActionPress = ()=>{
		this.props.onEditTag(this.props._id)
	}

	render() {
		const { _id, count } = this.props
		
		return (
			<Goto 
				last
				label={_id}
				subLabel={count}
				icon='hashtag'
				color='tag'
				action=''
				onPress={this.onPress} />
		)
	}
}