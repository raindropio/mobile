import React from 'react'
import { Platform } from 'react-native'
import t from 't'
import _ from 'lodash'
import { connect } from 'react-redux'
import { status } from 'data/selectors/bookmarks'
import { makeFiltersSearch } from 'data/selectors/filters'
import { makeTagsSearch } from 'data/selectors/tags'
import Button from 'co/button'

import Search from 'co/form/search'
import Suggestions from './suggestions'
import { Wrap, Header, HeaderSearchWrap } from './style'

function getLastPart(str) {
    const parts = (str||'').split(/\s+/)
    return (_.last(parts)||'').trim()
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

    onSubmit = ({ nativeEvent: { text } }) =>
        this.props.setQuery(text)

    onFocus = () =>
        this.setState({ focus: true })

    onBlur = () =>
        this.setState({ focus: false })

    submitBounced = _.debounce(this.props.submit, 350, { maxWait: 1000 })

    render() {
        const { query, route: { params={} }, children, navigation } = this.props
        const { autoFocus=true } = params

        return (
            <Wrap>
                <Header>
                    <HeaderSearchWrap>
                        <Search
                            autoFocus={autoFocus}
                            value={query}
                            variant={Platform.OS=='ios' ? 'default' : 'head'}
                            onChange={this.onChange}
                            onSubmit={this.onSubmit}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur} />
                    </HeaderSearchWrap>

                    {Platform.OS=='ios' && (
                        <Button 
                            title={t.s('cancel')}
                            onPress={navigation.goBack} />
                    )}
                </Header>

                {children}

                <Suggestions 
                    {...this.props}
                    {...this.state} />
            </Wrap>
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