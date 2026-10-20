import { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import t from 't'
import { useNavigation } from '@react-navigation/native'

import { Wrap, Header } from './style'
import SearchField from 'co/form/search'
import All from './all'

const flexOne = { flex: 1 }

export default function TagsPicker({ ref, ...props }) {
	const { selected, onChange, onSubmit } = props
	const navigation = useNavigation()
	const [value, setValue] = useState('')

	const onAdd = (name)=>{
		onChange(_.uniq([
			...selected, 
			...name.split(',').map(t=>t.trim()).filter(t=>t)
		]))
		setValue('')
	}

	const onRemove = (name)=>
		onChange(_.without(selected, name))

	const onToggle = (name)=>
		selected.includes(name) ? onRemove(name) : onAdd(name)

	const onEdit = (tagName)=>
		navigation.navigate('tag/edit', { tagName })

	const onFieldSubmit = ()=>{
		if (!value)
			onSubmit()
		else
			onAdd(value)
	}

	//tag typed in search field but not yet added
	useImperativeHandle(ref, ()=>({
		addPending: ()=>{
			if (value)
				onAdd(value)
		}
	}))

	const onFieldChange = (value)=>{
		if (value.includes(',')){
			onAdd(value)
			return
		}

		setValue(value)
	}

	return (
		<Wrap>
			<Header>
				<SearchField 
					value={value}
					onChange={onFieldChange}
					onSubmit={onFieldSubmit}
					style={flexOne}
					autoFocus
					blurOnSubmit={false}
					placeholder={t.s('addTags')+'...'}
					returnKeyType='send'
					returnKeyLabel={t.s('add')} />
			</Header>

			<All 
				{...props}
				onAdd={onAdd}
				onRemove={onRemove}
				onToggle={onToggle}
				onEdit={onEdit}
				onSubmit={onFieldSubmit}
				value={value} />
		</Wrap>
	)
}

TagsPicker.propTypes = {
	selected:	PropTypes.array,
	spaceId:	PropTypes.any, //optional
	onSubmit: 	PropTypes.func,
	onChange:	PropTypes.func
}