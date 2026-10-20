import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { load } from 'data/actions/filters'
import { getTags } from 'data/selectors/tags'
import { getQuickFilters } from 'data/selectors/filters'

import FiltersSection from 'co/filters/section'
import Filter from 'co/filters/item'
import TagsSection from 'co/tags/section'
import Tag from 'co/tags/item'

const keyExtractor = (row={})=>
    row.type + row._id

export default function FiltersTags({ navigation, children }) {
    const dispatch = useDispatch()

    const tags = useSelector(state=>getTags(state, 'global'))
    const tags_hide = useSelector(state=>state.config.tags_hide)
    const filters = useSelector(state=>getQuickFilters(state, 'global'))
    const filters_hide = useSelector(state=>state.config.filters_hide)

    useEffect(()=>{
        dispatch(load('global'))
    }, [dispatch])

    const onItemPress = (tagName, { query })=>
        navigation.navigate('space/search', { query, autoFocus: false })

    const onEditTag = (tagName)=>
        navigation.navigate('tag/edit', { tagName })

    const rowRenderer = ({ item: row })=>{
        let Component
        switch(row.type || row._id) {
            case 'filters': Component = FiltersSection; break
            case 'filter': Component = Filter; break
            case 'tags': Component = TagsSection; break
            case 'tag': Component = Tag; break
            default: return false
        }

        return (
            <Component
                {...row}
                onItemPress={onItemPress}
                onEdit={onEditTag} />
        )
    }

    let data = []

    if (filters.length){
        data.push({ _id: 'filters', hidden: filters_hide })

        if (!filters_hide)
            data.push(...filters.map(filter=>({ ...filter, type: 'filter' })))
    }

    if (tags.length){
        data.push({ _id: 'tags', hidden: tags_hide, count: tags.length })

        if (!tags_hide)
            data.push(...tags.map(tag=>({ ...tag, type: 'tag' })))
    }

    return children(data, rowRenderer, keyExtractor)
}