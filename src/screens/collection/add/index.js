import { useState } from 'react'
import PropTypes from 'prop-types'
import t from 't'
import { useSelector, useDispatch } from 'react-redux'
import { oneCreate } from 'data/actions/collections'

import Header from 'co/navigation/header'
import Button, { Buttons } from 'co/button'
import Form from '../edit/form'

const emptyObject = {}

function AddCollectionForm({ route: { params={} }, navigation }) {
	const dispatch = useDispatch()
	const firstGroup = useSelector(state=>state.collections.groups.length ? state.collections.groups[0] : emptyObject)

	const [loading, setLoading] = useState(false)
	const [newItem, setNewItem] = useState(()=>({
		title: params.title || '',
		public: false,
		parentId: params.parentId || firstGroup._id,
		view: 'list'
	}))

	const onSave = ()=>{
		setLoading(true)

		dispatch(oneCreate(
			newItem,
			item=>{
				navigation.goBack()
				params.onSuccess && params.onSuccess(item)
			},
			()=>{
				setLoading(false)
			}
		))
	}

	const onChange = (changedFields={})=>
		setNewItem(state=>({
			...state,
			...changedFields
		}))

	const disabled = !(newItem.title||'').trim() || loading

	return (
		<>
			<Header.Title parentId={newItem.parentId}>
				{typeof newItem.parentId == 'number' ? t.s('createSubFolder') : t.s('collectionNew')}
			</Header.Title>

			<Form 
				{...newItem}
				focus='title'
				navigation={navigation}
				onSave={onSave}
				onChange={onChange}>
				<Buttons vertical>
					<Button 
						title={t.s('create')}
						bold
						background='color.accent'
						disabled={disabled}
						onPress={onSave} />
				</Buttons>
			</Form>
		</>
	)
}

AddCollectionForm.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			title:		PropTypes.string,
			parentId:	PropTypes.oneOfType([
				PropTypes.string, //group id
				PropTypes.number //collection id
			]),
			onSuccess:	PropTypes.func
		})
	})
}

export default AddCollectionForm