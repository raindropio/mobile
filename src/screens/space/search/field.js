import React from 'react'
import { Title } from 'co/navigation/header'
import Search from 'co/common/searchBar'

export default function SearchField({ query, status, onQueryChange, onSubmit }) {
    return (
        <Title query={query}>
            <Search
                autoFocus
                value={query}
                loading={status.main == 'loading'}
                onChange={onQueryChange}
                onSubmit={onSubmit} />
        </Title>
    )
}