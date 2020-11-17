import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { oneRemove } from 'data/actions/tags'

import { Bg } from './style'
import Goto from 'co/common/goto'
import Swipeable, { Button } from 'co/list/swipeable'

class Tag extends React.PureComponent {
	static propTypes = {
		_id: PropTypes.string,
		count: PropTypes.number,
		selected: PropTypes.bool,

		onItemPress: PropTypes.func, //on tap on tag
		onEdit: PropTypes.func, //on edit tag
	}

	onPress = ()=>
		this.props.onItemPress(this.props._id)

	onRemove = ()=>{
		this.props.oneRemove(this.props._id)
	}

	rightActions = ()=>[
		<Button 
			key='edit'
			icon='pencil'
			variant='fill'
			background='color.accent'
			onPress={()=>this.props.onEdit && this.props.onEdit(this.props._id)} />,

		<Button 
			key='delete'
			icon='delete-bin'
			background='color.danger'
			onPress={this.onRemove} />
	]

	render() {
		const { _id, count, selected } = this.props
		
		return (
			<Swipeable right={this.rightActions}>
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
			</Swipeable>
		)
	}
}

export default connect(
	undefined,
	{ oneRemove }
)(Tag)