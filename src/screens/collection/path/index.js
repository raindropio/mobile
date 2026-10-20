import { useMemo } from 'react'
import PropTypes from 'prop-types'
import t from 't'

import TreeContainer from 'co/collections/items'

function CollectionPathScreen({ route: { params={} }, navigation }) {
	//tree resets its state when options identity changes
	const treeOptions = useMemo(()=>({
		hideIds: [params._id, 0, -1, -99]
	}), [params._id])

	const onItemPress = ({ _id })=>{
		params.onSelect(_id)
		navigation.goBack()
	}

	return (
		<TreeContainer 
			selectedId={params.parentId}
			options={treeOptions}
			searchAutoFocus
			groupSelectable
			onItemPress={onItemPress} />
	)
}

CollectionPathScreen.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			_id:		PropTypes.number,
			parentId:	PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number
			]),
			onSelect:	PropTypes.func
		})
	})
}

CollectionPathScreen.options = {
	title: t.s('selectCollection')
}

export default CollectionPathScreen