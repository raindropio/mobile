import { useCallback } from 'react'
import _ from 'lodash'

const lastPart = (str)=>{
    const parts = (str||'').split(/\s+/)
    return (_.last(parts)||'').trim()
}

export default function({ query='', wait=false }, navigation) {
    const setQuery = useCallback((query, wait=false)=>{
        if (navigation.isFocused())
            navigation.setParams({
                query,
                wait: !query ? false : wait
            })
    }, [navigation])

    const appendQuery = useCallback(filter=>{
        const next = (query+'').replace(new RegExp(`${_.escapeRegExp(lastPart(query))}$`), filter)
        setQuery(next, !next.endsWith(' '))
    }, [query, setQuery])

    return { query, wait, setQuery, appendQuery }
}