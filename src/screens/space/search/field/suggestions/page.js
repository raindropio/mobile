import React from 'react'

import { Wrap, Scroll, Items } from './page.style'
import SectionTags from 'co/tags/section'
import SectionFilters from 'co/filters/section'

class SearchSuggestionsPage extends React.Component {
    renderItem = (item)=>
        this.props.renderItem({ item })

    render() {
        const { tags, filters } = this.props

        return (
            <Wrap>
                <Scroll>
                    <SectionTags />
                    <Items>{tags.map(this.renderItem)}</Items>
                    
                    <SectionFilters />
                    <Items>{filters.map(this.renderItem)}</Items>
                </Scroll>
            </Wrap>
        )
    }
}

export default SearchSuggestionsPage