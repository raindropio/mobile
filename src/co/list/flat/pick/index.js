import React from 'react'
import PropTypes from 'prop-types'
import Goto from 'co/goto'

export default class PickFlatList extends React.Component {
	static propTypes = {
		options:	PropTypes.arrayOf(
			PropTypes.shape({
				id:			PropTypes.string,
				label:		PropTypes.string,
				subLabel:	PropTypes.string
			})
		),
		selected:	PropTypes.any,
		onSelect:	PropTypes.func
	}

	onSelect = (id)=>{
		this.props.onSelect(id)
	}

	renderOption = ({id, label, subLabel}, i) => (
		<Goto
			last={i>=this.props.options.length-1}
			key={id}
			label={label}
			subLabel={subLabel}
			action=''
			icon='checkbox-circle'
			color={this.props.selected==id ? 'accent' : 'transparent'}
			variant='fill'
			onPress={()=>this.onSelect(id)} />
	)

	render() {
		return this.props.options.map(this.renderOption)
	}
}