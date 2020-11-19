import React from 'react'
import t from 't'
import PropTypes from 'prop-types'
import Goto from 'co/common/goto'

export const getDetails = (_id)=>{
	let icon = _id, label = t.s(_id+'s')
	switch(_id) {
		case 'audio': icon = 'mv'; break
		case 'broken': icon = 'ghost'; label = t.s('broken'); break
		case 'duplicate': icon = 'file-copy'; break
		case 'important': icon = 'heart-3'; label = t.s('favorites'); break
		case 'document': icon = 'file-text'; break
		case 'notag': icon = 'hashtag'; label = t.s('noTags'); break
	}

	return { icon, label }
}

export default class Filter extends React.PureComponent {
	static propTypes = {
		_id: PropTypes.string,
		count: PropTypes.number,

		onItemPress: PropTypes.func //filterId, { _id, query... }
	}

	onPress = ()=>
		this.props.onItemPress(this.props._id, this.props)

	render() {
		const { _id, count } = this.props
		const { label, icon } = getDetails(_id)
		
		return (
			<Goto 
				last
				label={label}
				subLabel={count}
				icon={icon}
				color={_id}
				action=''
				onPress={this.onPress} />
		)
	}
}