import { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { draftLoad, draftCommit, draftChange, oneReorder } from 'data/actions/collections'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/collections'

import Form from './form'
import Error from 'co/alert/error'

function EditCollectionView({ route: { params={} }, navigation }) {
	const dispatch = useDispatch()

	const getDraftItem = useMemo(()=>makeDraftItem(), [])
	const getDraftStatus = useMemo(()=>makeDraftStatus(), [])

	const status = useSelector(state=>getDraftStatus(state, params._id))
	const item = useSelector(state=>getDraftItem(state, params._id))

	useEffect(()=>{
		dispatch(draftLoad(params._id))
		return ()=>dispatch(draftCommit(params._id))
	}, [dispatch, params._id])

	useEffect(()=>{
		if (status == 'errorSaving')
			Alert.alert(t.s('saveError'))
	}, [status])

	const onClose = ()=>
		navigation.goBack()

	const onChange = obj=>{
		dispatch(draftChange(item._id, obj))

		if (obj.parentId)
			dispatch(oneReorder(item._id, { to: obj.parentId }))
		
		if (typeof obj.title == 'undefined')
			dispatch(draftCommit(item._id))
	}

	if (status == 'error')
		return <Error />

	return (
		<Form 
			{...params}
			navigation={navigation}
			{...item}
			onSave={onClose}
			onChange={onChange} />
	)
}

EditCollectionView.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			_id:    PropTypes.number,
			focus:	PropTypes.string
		})
	})
}

EditCollectionView.options = {
	title: t.s('collection')
}

export default EditCollectionView