import { useMemo, useEffect } from 'react'
import _ from 'lodash-es'
import { useDispatch, useSelector } from 'react-redux'
import { makeSuggestions, makeRecent } from 'data/selectors/search'
import { autoLoad } from 'data/actions/filters'

const lastPart = (str)=>{
    const parts = (str||'').split(/\s+/)
    return (_.last(parts)||'').trim()
}

export default function useMenuItems(spaceId, query) {
    const dispatch = useDispatch()

    const filter = useMemo(()=>lastPart(query), [query])

    const getSuggestions = useMemo(makeSuggestions, [])
    const suggestions = useSelector(state=>getSuggestions(state, spaceId, filter, query))

    const getRecent = useMemo(makeRecent, [])
    const recent = useSelector(state=>getRecent(state, spaceId, filter, query))

    //refresh suggestions
    useEffect(()=>{
        dispatch(autoLoad(spaceId, true))
        return ()=>dispatch(autoLoad(spaceId, false))
    }, [spaceId])

    return {
        suggestions,
        recent
    }
}