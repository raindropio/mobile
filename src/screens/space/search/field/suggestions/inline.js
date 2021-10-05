import React from 'react'
import { Wrap, List } from './inline.style'

class SearchSuggestionsInline extends React.Component {
    keyExtractor = ({_id})=>_id

    render() {
        const { tags, filters, renderItem, status, focus } = this.props

        if (!focus || (!tags.length && !filters.length))
            return null

        return (
            <Wrap>
                <List
                    status={status}
                    data={[...tags, ...filters]}
                    keyExtractor={this.keyExtractor}
                    renderItem={renderItem} />
            </Wrap>
        )
    }
}

export default SearchSuggestionsInline