import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import _ from 'lodash'
import { connect } from 'react-redux'
import { status } from 'data/selectors/bookmarks'
import { makeFiltersSearch } from 'data/selectors/filters'
import { makeTagsSearch } from 'data/selectors/tags'

import Search from 'co/common/searchBar'
import { Title } from 'co/navigation/header'
import Suggestions from './suggestions'

const placeholder = `${t.s('bookmark')}, ${t.s('collection').toLowerCase()} ${t.s('or')} ${t.s('tag')}…`

function getLastPart(str) {
    const parts = (str||'').split(/\s+/)
    return ((parts[parts.length-1])||'').trim()
}

class SearchField extends React.Component {
    state = {
        focus: false
    }

    onChange = value=>{
        this.props.setQuery(value, false)

        const { filters, tags } = this.props
        const lastPart = getLastPart(value)

        if (!filters.length && 
            !tags.length &&
            !lastPart.startsWith('#') &&
            !lastPart.includes(':'))
            this.submitBounced()
    }

    onSubmit = () =>
        this.props.setQuery(this.props.query)

    onFocus = () =>
        this.setState({ focus: true })

    onBlur = () =>
        this.setState({ focus: false })

    submitBounced = _.debounce(this.props.submit, 350, { maxWait: 1000 })

    render() {
        const { query } = this.props

        return (
            <>
                <Title a={1}>
                    <Search
                        autoFocus
                        value={query}
                        variant={Platform.OS=='ios' ? 'default' : 'head'}
                        placeholder={placeholder}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur} />
                </Title>

                <Suggestions 
                    {...this.props}
                    {...this.state} />
            </>
        )
    }
}

export default connect(
    () => {
        const getFiltersAutocomplete = makeFiltersSearch()
        const getTagsSearch = makeTagsSearch()
    
        return (state, { query, ...props }) => {
            const spaceId = props.spaceId+'s'

            return {
                spaceId,
                filters: getFiltersAutocomplete(state, spaceId, getLastPart(query)),
                tags: getTagsSearch(state, spaceId, getLastPart(query)),
                status: status(state, spaceId).main
            }
        }
    }
)(SearchField)