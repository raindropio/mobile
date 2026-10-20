import { useEffect, useMemo, useRef } from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { draftLoad, draftCommit } from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus, getDraftError, makeDraftUnsaved } from 'data/selectors/bookmarks'
import t from 't'

import { ScrollForm } from 'co/form'

import Actions from './actions'
import Indicators from './indicators'
import Item from './item'
import Date from './date'
import New from './new'
import Header from './header'
import Disabled from './disabled'

function EditBookmarkContainer({ route: { params={} }, ...etc }) {
	const dispatch = useDispatch()

	const getDraftItem = useMemo(()=>makeDraftItem(), [])
	const getDraftStatus = useMemo(()=>makeDraftStatus(), [])
	const getDraftUnsaved = useMemo(()=>makeDraftUnsaved(), [])

	const status = useSelector(state=>getDraftStatus(state, params._id))
	const item = useSelector(state=>getDraftItem(state, params._id))
	const error = useSelector(state=>getDraftError(state, params._id))
	const unsaved = useSelector(state=>getDraftUnsaved(state, params._id))

	useEffect(()=>{
		dispatch(draftLoad(params._id, params.new || {}))
	}, [dispatch, params._id, params.new])

	const prevStatus = useRef(status)
	useEffect(()=>{
		if (prevStatus.current != status && status == 'error') {
			console.error(error?.message)
			Alert.alert(t.s('error'), error?.message)
		}
		prevStatus.current = status
	}, [status, error])

	const save = async()=>{
		try{
			await new Promise((res,rej)=>
				dispatch(draftCommit(params._id, res, rej))
			)

			return true
		} catch(error) {
			console.error(error)
			Alert.alert(t.s('error'), error?.message)
			return false
		}
	}

	//save on close
	const latest = useRef({})
	useEffect(()=>{
		latest.current = { status, save, onClose: etc.onClose }
	})
	useEffect(()=>()=>{
		const { status, save, onClose } = latest.current

		if (status != 'new')
			save()

		if (onClose)
			onClose()
	}, [])

	const props = { ...params, ...etc, status, item, error, unsaved }

	return (
		<>
			<Header {...props} />
			
			<ScrollForm>
				<Indicators {...props} />
				<Item {...props} />
				<Actions {...props} />
				<Date {...props} />

				<New {...props} save={save} />
			</ScrollForm>

			<Disabled {...props} />
		</>
	)
}

EditBookmarkContainer.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			_id: 			PropTypes.oneOfType([
							PropTypes.number, //exact id
							PropTypes.string //by link
			]),
			new:			PropTypes.any, //optional, { item: {}, autoCreate: true, preventDuplicate: true }
			spaceId:		PropTypes.any,
			onClose:		PropTypes.func
		})
	})
}

EditBookmarkContainer.options = ({ route: { params } }) => ({
	title: t.s('bookmark'),
	animation: params?.animation
})

export default EditBookmarkContainer