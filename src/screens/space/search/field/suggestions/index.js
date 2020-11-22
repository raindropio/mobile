import React from 'react'
import _ from 'lodash-es'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { status } from 'data/selectors/bookmarks'
import { makeFiltersSearch } from 'data/selectors/filters'
import { autoLoad } from 'data/actions/filters'
import { makeTagsSearch } from 'data/selectors/tags'

import Page from './page'
import Inline from './inline'
import Item from './item'

function getLastPart(str) {
    const parts = (str||'').split(/\s+/)
    return ((parts[parts.length-1])||'').trim()
}

function setLastPart(str, val) {
    return (str+'').replace(new RegExp(`${_.escapeRegExp(getLastPart(str))}$`), val)
}

class SearchSuggestions extends React.Component {
    static propTypes = {
        spaceId:            PropTypes.any,
        query:              PropTypes.string,

        onQueryAppend:      PropTypes.func,
        onHaveSuggestions:  PropTypes.func,
    }

    componentDidMount() {
        this.props.autoLoad(this.props.spaceId, true)
        this.onChangeSuggestions()
    }

    componentDidUpdate(prev) {
        if (prev.spaceId != this.props.spaceId){
            this.props.autoLoad(prev.spaceId, false)
            this.props.autoLoad(this.props.spaceId, true)
        }

        if (prev.filters.length != this.props.filters.length ||
            prev.tags.length != this.props.tags.length){
            this.onChangeSuggestions()
        }
    }

    componentWillUnmount() {
        this.props.autoLoad(this.props.spaceId, false)
    }

    onChangeSuggestions = ()=>{
        const haveSuggestions = (this.props.filters.length + this.props.tags.length) > 0
        this.props.onHaveSuggestions && this.props.onHaveSuggestions(haveSuggestions)
    }

    onItemPress = ({ query })=>
        this.props.setQuery(setLastPart(this.props.query, query)+' ')

    renderItem = ({ item })=>(
        <Item 
            key={item._id}
            {...item}
            onPress={this.onItemPress} />
    )

    render() {
        const Component = this.props.query ? Inline : Page

        return (
            <Component
                {...this.props}
                renderItem={this.renderItem} />
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
    },
    { autoLoad }
)(SearchSuggestions)