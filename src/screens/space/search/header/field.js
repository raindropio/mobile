import React, { useCallback, useEffect, useMemo } from 'react'
import { Platform } from 'react-native'
import _ from 'lodash-es'

import { Wrap } from './field.style'
import useQuery from '../useQuery'
import Search from 'co/form/search'

function SearchField({ route: { params }, navigation, inputRef }) {
    const { autoFocus=true } = params
    const { query, setQuery } = useQuery(params, navigation)

    //form events
    const onValueChange = useCallback(value=>setQuery(value, true), [setQuery])
    const onValueSubmit = useCallback(()=>setQuery(query, false), [query])

    //auto submit
    // const setQueryDebounced = useMemo(()=>
    //     _.debounce(setQuery, 350, { maxWait: 1000 }),
    //     [setQuery]
    // )
    
    // useEffect(()=>{
    //     setQueryDebounced.cancel()

    //     //ignore incomplete token
    //     if (query.endsWith(':'))
    //         return

    //     //submit later bounced
    //     setQueryDebounced(query, false)
    // }, [query, onValueSubmit, setQueryDebounced])

    return (
        <Wrap>
            <Search
                ref={inputRef}
                autoFocus={autoFocus}
                variant={Platform.OS=='ios' ? 'default' : 'head'}
                value={query}
                onChange={onValueChange}
                onSubmit={onValueSubmit} />
        </Wrap>
    )
}

export default SearchField