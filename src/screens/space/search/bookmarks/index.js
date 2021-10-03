import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { load } from 'data/actions/bookmarks'

import useSpaceId from '../useSpaceId'
import useQuery from '../useQuery'
import Bookmarks from 'co/bookmarks/items'

export default function SearchBookmarks({ route: { params }, navigation }) {
    const spaceId = useSpaceId(params)
    const { query, wait } = useQuery(params)

    const dispatch = useDispatch()
    useEffect(()=>{
        if (!wait)
            dispatch(load(spaceId, { search: (query||'').trim() }))
    }, [spaceId, query, wait])

    const onCollectionPress = useCallback(spaceId=>
        navigation.push('browse', { spaceId }),
        [spaceId]
    )

    if (!query || wait)
        return null

    return (
        <Bookmarks
            key={spaceId}
            spaceId={spaceId}
            onCollectionPress={onCollectionPress} />
    )
}