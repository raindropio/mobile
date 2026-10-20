import { useState, useMemo } from 'react'
import t from 't'
import _ from 'lodash-es'
import SearchBar from 'co/form/search'

export default function CollectionCoverField({ query, onSearch }) {
    const [ value, setValue ] = useState(query)

    const placeholder = `${t.s('defaultCollection-0')} ${t.s('icon').toLowerCase()}...`

    const debouncedSearch = useMemo(()=>_.debounce(onSearch, 500), [onSearch])

    const onChange = value=>{
        setValue(value)
        
        if (!value)
            onSearch(value)
        else
            debouncedSearch(value)
    }
    
    const onSubmit = ()=>onSearch(value)

    return (
        <SearchBar 
            autoFocus
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onSubmit={onSubmit} />
    )
}