import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { autoLoad } from 'data/actions/filters'
import { load } from 'data/actions/bookmarks'

import useSpaceId from './useSpaceId'
import useQuery from './useQuery'

export default function SpaceSearchLoad({ route: { params } }) {
    const dispatch = useDispatch()

    const spaceId = useSpaceId(params)
    const { query, wait } = useQuery(params)

    //load suggestions
    useEffect(()=>{
        dispatch(autoLoad(spaceId, true))
        return ()=>dispatch(autoLoad(spaceId, false))
    }, [spaceId])

    //load bookmarks
    useEffect(()=>{
        if (!wait || !query)
            dispatch(load(spaceId, { search: (query||'').trim() }))
    }, [spaceId, query, wait])

    return null
}