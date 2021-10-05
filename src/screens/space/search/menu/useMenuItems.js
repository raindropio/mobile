import { useMemo } from 'react'
import _ from 'lodash-es'
import { useSelector } from 'react-redux'
import { makeSuggestions, makeRecent } from 'data/selectors/search'

const lastPart = (str)=>{
    const parts = (str||'').split(/\s+/)
    return (_.last(parts)||'').trim()
}

export default function useMenuItems(spaceId, query) {
    const filter = useMemo(()=>lastPart(query), [query])

    const getSuggestions = useMemo(makeSuggestions, [])
    const suggestions = useSelector(state=>getSuggestions(state, spaceId, filter, query))

    const getRecent = useMemo(makeRecent, [])
    const recent = useSelector(state=>getRecent(state, spaceId, filter, query))

    return {
        suggestions,
        recent
    }
}