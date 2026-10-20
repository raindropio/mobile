import { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { draftLoad, draftChange, draftCommit } from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'

import TreeContainer from 'co/collections/items'

const treeOptions = {
	hideIds: [0]
}

function BookmarkPathScreen({ route: { params={} }, navigation }) {
	const dispatch = useDispatch()

	const getDraftItem = useMemo(()=>makeDraftItem(), [])
	const getDraftStatus = useMemo(()=>makeDraftStatus(), [])

	const item = useSelector(state=>getDraftItem(state, params._id))
	const status = useSelector(state=>getDraftStatus(state, params._id))

	const initialStatus = useRef(status)
	useEffect(()=>{
		if (initialStatus.current!='loaded' &&
			initialStatus.current!='new')
			dispatch(draftLoad(params._id))
	}, [dispatch, params._id])

	const onItemPress = ({ _id })=>{
		dispatch(draftChange(params._id, { collectionId: _id }))

		if (params.autoCommit !== false)
			dispatch(draftCommit(params._id))
			
		navigation.goBack()
	}

	return (
		<TreeContainer 
			selectedId={item.collectionId}
			options={treeOptions}
			searchAutoFocus={false}
			onItemPress={onItemPress} />
	)
}

BookmarkPathScreen.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			_id:		PropTypes.oneOfType([
						PropTypes.number, //exact id
						PropTypes.string //by link
			]),
			autoCommit:	PropTypes.bool //true by default
		})
	})
}

BookmarkPathScreen.options = ({ route: { params={} } })=>({
	title: params.title || t.s('selectCollection')
})

export default BookmarkPathScreen