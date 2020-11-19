import React from 'react'
import { List } from './inline.style'

class SearchSuggestionsInline extends React.Component {
    keyExtractor = (item) => item._id

    render() {
        const { tags, filters, status, renderItem } = this.props

        return (
            <List
                status={status}
                data={[...tags, ...filters]}
                keyExtractor={this.keyExtractor}
                renderItem={renderItem} />
        )
    }
}

export default SearchSuggestionsInline