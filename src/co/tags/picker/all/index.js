import { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { load } from 'data/actions/filters'
import { makeTagsAutocomplete } from 'data/selectors/tags'

import FlatList from 'co/list/flat/basic'
import { getListViewParams } from 'modules/view'
import size from 'modules/appearance/size'
import Tag from 'co/tags/item'
import Section from './section'
import Header from './header'
import Empty from './empty'

const listViewParams = getListViewParams(size.height.item)
const keyExtractor = ({ _id })=>_id

export default function Tags({ spaceId='global', value, selected, onToggle, onEdit, onSubmit }) {
	const dispatch = useDispatch()
	useEffect(()=>{
		dispatch(load('global'))
		
		if (parseInt(spaceId))
			dispatch(load(spaceId))
	}, [dispatch, spaceId])

	const getTagsAutocomplete = useMemo(()=>makeTagsAutocomplete(), [])
	const autocomplete = useSelector(state=>getTagsAutocomplete(state, spaceId, value, selected))

	const filtered = selected
		.filter(tag=>value ? tag.toLocaleLowerCase().includes(value.toLocaleLowerCase()) : true)
		.map(_id=>({ _id }))

	const tags = [
		...(filtered.length ? [
			{ type: 'section', _id: 'selected' },
			...filtered
		] : []),
		...autocomplete
	]

	//render
	const header = ()=>(
		<Header value={value} tags={tags} onSubmit={onSubmit} />
	)

	const empty = ()=>(
		<Empty value={value} selected={selected} />
	)

	const renderItem = ({ item })=>{
		switch(item.type) {
			case 'section':
				return <Section {...item} />
	
			default:
				return (
					<Tag 
						{...item}
						selected={selected.includes(item._id)}
						swipeEnabled={false}
						onItemPress={onToggle}
						onEdit={onEdit} />
				)
		}
	}

	return (
		<FlatList 
			{...listViewParams}
			data={tags}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			ListHeaderComponent={header}
			ListEmptyComponent={empty} />
	)
}