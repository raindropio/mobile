import { useCallback, useMemo } from 'react';
import t from 't'
import Sections from 'co/list/sections/basic'
import Filter from 'co/filters/item'

import useSpaceId from '../useSpaceId'
import useQuery from '../useQuery'
import useMenuItems from './useMenuItems'
import Section from './section'
import Empty from './empty'
import { Wrap } from './style'

export default function SearchMenu({ route: { params }, navigation }) {
    const spaceId = useSpaceId(params)
    const { query, wait, appendQuery } = useQuery(params, navigation)
    const { suggestions, recent } = useMenuItems(spaceId, query)

    const sections = useMemo(()=>[
        ...(suggestions.length ? [{
            title: query ? t.s('narrowSearch') : t.s('suggested'),
            data: suggestions
        }] : []),
        ...(recent.length ? [{
            title: t.s('recent'),
            data: recent
        }] : [])
    ], [suggestions, recent])

    const onItemPress = useCallback((_id, {query})=>{
        if (query.startsWith('collection:'))
            navigation.navigate('browse', { spaceId: _id })
        else
            appendQuery(query)
    }, [appendQuery])

    const keyExtractor = useCallback(({ query, date })=>query+date, [])

    const renderItem = useCallback(({ item })=>(
        <Filter 
            {...item}
            onItemPress={onItemPress} />
    ), [onItemPress])

    const renderSectionHeader = useCallback(({ section })=>(
        <Section {...section} />
    ), [])

    if (query && !wait)
        return null

    return (
        <Wrap>
            <Sections
                keyExtractor={keyExtractor}
                sections={sections}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                ListEmptyComponent={Empty} />
        </Wrap>
    )
}