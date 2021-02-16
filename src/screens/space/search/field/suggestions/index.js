import React from 'react'
import _ from 'lodash-es'
import PropTypes from 'prop-types'

import Page from './page'
import Inline from './inline'
import Item from './item'

function setLastPart(str, val) {
    const parts = (str||'').split(/\s+/)
    const lastPart = ((parts[parts.length-1])||'').trim()

    return (str+'').replace(new RegExp(`${_.escapeRegExp(lastPart)}$`), val)
}

export default class SearchSuggestions extends React.Component {
    static propTypes = {
        spaceId:            PropTypes.any,
        query:              PropTypes.string,

        onQueryAppend:      PropTypes.func,
        onHaveSuggestions:  PropTypes.func,
    }

    onItemPress = ({ query })=>
        this.props.setQuery(setLastPart(this.props.query, query)+' ')

    renderItem = ({ item={}, cloud })=>(
        <Item 
            key={item._id}
            {...item}
            cloud={cloud}
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