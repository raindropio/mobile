import { useEffect, useMemo, useRef } from 'react'
import t from 't'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { draftLoad, draftChange, draftCommit } from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'

import TagPicker from 'co/tags/picker'
import Header from 'co/navigation/header'

function BookmarkTagsScreen({ route: { params={} }, navigation }) {
	const dispatch = useDispatch()

	const getDraftItem = useMemo(()=>makeDraftItem(), [])
	const getDraftStatus = useMemo(()=>makeDraftStatus(), [])

	const status = useSelector(state=>getDraftStatus(state, params._id))
	const item = useSelector(state=>getDraftItem(state, params._id))

	const initialStatus = useRef(status)
	useEffect(()=>{
		if (initialStatus.current!='loaded' &&
			initialStatus.current!='new')
			dispatch(draftLoad(params._id))
	}, [dispatch, params._id])

	useEffect(()=>()=>{
		if (params.autoCommit)
			dispatch(draftCommit(params._id))
	}, [dispatch, params._id, params.autoCommit])

	const onChange = (tags)=>
		dispatch(draftChange(params._id, { tags }))

	const onSave = ()=>(
		new Promise((res,rej)=>{
			dispatch(draftCommit(params._id, res, rej))
		})
	)

	const picker = useRef(null)

	const onSubmit = async()=>{
		picker.current?.addPending()
		await onSave()
		navigation.goBack()
	}

	if (status == 'loading')
		return null

	return (
		<>
			<Header.Buttons status={status}>
				<Header.Button 
					bold
					disabled={status=='saving'}
					title={t.s('save')}
					onPress={onSubmit} />
			</Header.Buttons>

			<TagPicker
				ref={picker}
				selected={item.tags}
				spaceId={item.collectionId}
				onChange={onChange}
				onSubmit={onSubmit} />
		</>
	)
}

BookmarkTagsScreen.propTypes = {
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

BookmarkTagsScreen.options = {
	title: t.s('bookmark') + ' ' + t.s('tags').toLowerCase()
}

export default BookmarkTagsScreen