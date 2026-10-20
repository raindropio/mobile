import { useMemo } from 'react'
import t from 't'
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import { useSelector, useDispatch } from 'react-redux'
import { moveSelected } from 'data/actions/bookmarks'
import { makeSelectMode } from 'data/selectors/bookmarks'

import Header from 'co/navigation/header'
import TreeContainer from 'co/collections/items'

const treeOptions = {
	hideIds: [0]
}

function BookmarksMoveSelected({ route: { params={} }, navigation }) {
	const dispatch = useDispatch()

	const getSelectMode = useMemo(()=>makeSelectMode(), [])
	const { all, ids } = useSelector(state=>getSelectMode(state, params.spaceId))

	const onItemPress = ({ _id })=>{
		dispatch(moveSelected(params.spaceId, _id))
		navigation.goBack()
	}

	return (
		<>
			<Header.Title ids={ids.length}>
				{_.capitalize(t.s('move')) + ' ' + (all ? t.s('all').toLowerCase() : ids.length) + ' ' + t.s('bookmarks')}
			</Header.Title>

			<Header.Buttons a>
				<Header.Cancel onPress={navigation.goBack} />
			</Header.Buttons>

			<TreeContainer
				options={treeOptions}
				onItemPress={onItemPress} />
		</>
	)
}

BookmarksMoveSelected.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			spaceId: PropTypes.number
		})
	})
}

export default BookmarksMoveSelected