import t from 't'
import PropTypes from 'prop-types'
import { useState, useEffect, useEffectEvent } from 'react'
import { useDispatch } from 'react-redux'
import { oneRename, oneRemove } from 'data/actions/tags'

import Form from './form'

function EditTagScreen({ route: { params }, navigation }) {
	const dispatch = useDispatch()

	const [tagName, setTagName] = useState(params.tagName)

	//rename on unmount
	const save = useEffectEvent(()=>{
		if (tagName.trim())
			dispatch(oneRename(params.tagName, tagName))
	})

	useEffect(()=>()=>save(), [])

	const onClose = ()=>
		navigation.goBack()

	const onRemove = ()=>
		dispatch(oneRemove(params.tagName, onClose))

	const onChange = ({ tagName })=>
		setTagName(tagName)

	return (
		<Form
			tagName={tagName}
			onSave={onClose}
			onChange={onChange}
			onRemove={onRemove} />
	)
}

EditTagScreen.propTypes = {
	route:  PropTypes.shape({
		params: PropTypes.shape({
			tagName: PropTypes.string
		})
	})
}

EditTagScreen.options = {
	title: t.s('edit') + ' ' + t.s('tag').toLowerCase()
}

export default EditTagScreen