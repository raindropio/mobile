import PropTypes from 'prop-types'
import t from 't'

import Goto from 'co/goto'

function CollectionRemove({ _id, last, navigation }) {
	const onRemove = ()=>
		navigation.replace('collection/remove', { _id })

	if (_id > 0 || _id == -99)
		return (
			<Goto 
				last={last}
				label={_id == -99 ? t.s('emptyTrash') : t.s('removeCollection')}
				action=''
				icon='delete-bin'
				color='danger'
				onPress={onRemove} />
		)

	return null
}

CollectionRemove.propTypes = {
	_id: PropTypes.number
}

export default CollectionRemove