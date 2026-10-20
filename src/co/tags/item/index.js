import { memo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { oneRemove } from 'data/actions/tags'

import { Bg } from './style'
import Goto from 'co/goto'
import Swipeable, { Button } from 'co/list/swipeable'

function Tag(props) {
	const { _id, count, selected, swipeEnabled=true, onItemPress, onEdit } = props
	const dispatch = useDispatch()

	const onPress = ()=>
		onItemPress(_id, props)

	const onRemove = ()=>{
		dispatch(oneRemove(_id))
	}

	const rightActions = ()=>[
		<Button 
			key='edit'
			icon='edit-box'
			background='color.accent'
			onPress={()=>onEdit && onEdit(_id)} />,

		<Button 
			key='delete'
			icon='delete-bin'
			background='color.danger'
			onPress={onRemove} />
	]

	return (
		<Swipeable right={swipeEnabled ? rightActions : undefined}>
			<Bg selected={selected}>
				<Goto 
					last
					label={_id}
					subLabel={count ? count : ''}
					icon={selected ? 'checkbox' : 'hashtag'}
					variant={selected ? 'fill' : undefined}
					color={selected ? 'accent' : 'tag'}
					action=''
					onPress={onPress} />
			</Bg>
		</Swipeable>
	)
}

Tag.propTypes = {
	_id: PropTypes.string,
	count: PropTypes.number,
	selected: PropTypes.bool,

	swipeEnabled: PropTypes.bool,

	onItemPress: PropTypes.func, //on tap on tag (tagName, {_id, query, count...})
	onEdit: PropTypes.func, //on edit tag
}

export default memo(Tag)