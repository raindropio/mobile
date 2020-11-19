import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import Search from 'co/common/searchBar'

const placeholder = `${t.s('bookmark')}, ${t.s('collection').toLowerCase()} ${t.s('or')} ${t.s('tag')}…`

export default function SearchField({ query, onQueryChange, onSubmit }) {
    return (
        <Search
            autoFocus
            value={query}
            variant={Platform.OS=='ios' ? 'default' : 'head'}
            placeholder={placeholder}
            onChange={onQueryChange}
            onSubmit={onSubmit} />
    )
}