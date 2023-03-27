import { useState, useCallback, useRef } from 'react';
import t from 't'
import _ from 'lodash-es'
import SearchBar from 'co/form/search'

export default function CollectionCoverField({ query, onSearch }) {
    const [ value, setValue ] = useState(query)

    const placeholder = useRef(`${t.s('defaultCollection-0')} ${t.s('icon').toLowerCase()}...`).current

    const debouncedSearch = useRef(_.debounce(onSearch, 500)).current

    const onChange = useCallback(value => {
        setValue(value)
        
        if (!value)
            onSearch(value)
        else
            debouncedSearch(value)
    }, [])
    
    const onSubmit = useCallback(()=>onSearch(value), [value])

    return (
        <SearchBar 
            autoFocus
            value={value}
            placeholder={placeholder}
            selectTextOnFocus={true}
            onChange={onChange}
            onSubmit={onSubmit} />
    )
}