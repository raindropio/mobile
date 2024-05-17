import { useMemo, useEffect, useCallback } from 'react';
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

export default function Tags({ spaceId='global', value, selected, onToggle, onEdit, onSubmit }) {
	const dispatch = useDispatch()
	useEffect(()=>{dispatch(load(spaceId || 'global'))}, [spaceId])

	const getTagsAutocomplete = useMemo(()=>makeTagsAutocomplete(), [])
	const autocomplete = useSelector(state=>getTagsAutocomplete(state, spaceId, value, selected))
	const tags = useMemo(()=>{
		const filtered = selected
			.filter(tag=>value ? tag.toLocaleLowerCase().includes(value.toLocaleLowerCase()) : true)
			.map(_id=>({ _id }))

		return [
			...(filtered.length ? [
				{ type: 'section', _id: 'selected' },
				...filtered
			] : []),
			...autocomplete
		]
	}, [selected, autocomplete, value])
	
	const listViewParams = useMemo(()=>getListViewParams(size.height.item), [])
	const keyExtractor = useCallback(({ _id })=>_id, [])

	//render
	const header = useCallback(()=>(
		<Header value={value} tags={tags} onSubmit={onSubmit} />
	), [value, tags, onSubmit])

	const empty = useCallback(()=>(
		<Empty value={value} selected={selected} />
	), [value, selected])

	const renderItem = useCallback(({ item })=>{
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
	}, [selected, onToggle, onEdit])

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