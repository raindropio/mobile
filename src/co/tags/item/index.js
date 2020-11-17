import React from 'react'
import PropTypes from 'prop-types'
import { Bg } from './style'
import Goto from 'co/common/goto'

export default class Tag extends React.PureComponent {
	static propTypes = {
		_id: PropTypes.string,
		count: PropTypes.number,
		selected: PropTypes.bool,

		onItemPress: PropTypes.func, //on tap on tag
		onRemove: PropTypes.func, //on remove tag
		onEdit: PropTypes.func, //on edit tag
	}

	onPress = ()=>
		this.props.onItemPress(this.props._id)

	onActionPress = ()=>{
		this.props.onEdit(this.props._id)
	}

	render() {
		const { _id, count, selected } = this.props
		
		return (
			<Bg selected={selected}>
				<Goto 
					last
					label={_id}
					subLabel={count ? count : ''}
					icon={selected ? 'checkbox' : 'hashtag'}
					variant={selected ? 'fill' : undefined}
					color={selected ? 'accent' : 'tag'}
					action=''
					onPress={this.onPress} />
			</Bg>
		)
	}
}