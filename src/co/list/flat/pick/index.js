import { Component } from 'react';
import PropTypes from 'prop-types'
import Goto from 'co/goto'

export default class PickFlatList extends Component {
	static propTypes = {
		options:	PropTypes.arrayOf(
			PropTypes.shape({
				id:			PropTypes.any,
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

	renderOption = ({id, icon, label, labelFontFamily, subLabel}, i) => {
		const selected = this.props.selected==id

		return (
			<Goto
				last={i>=this.props.options.length-1}
				key={id}
				label={label}
				labelFontFamily={labelFontFamily}
				subLabel={subLabel}
				icon={icon}
				action={selected ? 'checkbox-circle' : 'checkbox-blank-circle'}
				actionColor={selected ? 'accent' : 'text.tertiary'}
				actionVariant={selected ? 'fill' : 'line'}
				onPress={()=>this.onSelect(id)} />
		)
	}

	render() {
		return this.props.options.map(this.renderOption)
	}
}