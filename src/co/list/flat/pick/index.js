import PropTypes from 'prop-types'
import Goto from 'co/goto'

export default function PickFlatList({ options, selected, onSelect }) {
	return options.map(({ id, icon, label, labelFontFamily, subLabel }, i)=>{
		const isSelected = selected==id

		return (
			<Goto
				last={i>=options.length-1}
				key={id}
				label={label}
				labelFontFamily={labelFontFamily}
				subLabel={subLabel}
				icon={icon}
				action={isSelected ? 'checkbox-circle' : 'checkbox-blank-circle'}
				actionColor={isSelected ? 'accent' : 'text.tertiary'}
				actionVariant={isSelected ? 'fill' : 'line'}
				onPress={()=>onSelect(id)} />
		)
	})
}

PickFlatList.propTypes = {
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