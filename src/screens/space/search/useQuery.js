import _ from 'lodash'

const lastPart = (str)=>{
    const parts = (str||'').split(/\s+/)
    return (_.last(parts)||'').trim()
}

export default function({ query='', wait=false }, navigation) {
    const setQuery = (query, wait=false)=>{
        if (navigation.isFocused())
            navigation.setParams({
                query,
                wait: !query ? false : wait
            })
    }

    const appendQuery = filter=>{
        const next = (query+'').replace(new RegExp(`${_.escapeRegExp(lastPart(query))}$`), filter)
        setQuery(next, !next.endsWith(' '))
    }

    return { query, wait, setQuery, appendQuery }
}