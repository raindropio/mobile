import React from 'react'
import { connect } from 'react-redux'

import { Wrap, Scroll, Items } from './page.style'
import SectionTags from 'co/tags/section'
import SectionFilters from 'co/filters/section'

class SearchSuggestionsPage extends React.Component {
    renderItem = (item)=>
        this.props.renderItem({ item })

    render() {
        const { tags, filters, filters_hide, tags_hide } = this.props

        return (
            <Wrap>
                <Scroll>
                    {!!tags.length && (<>
                        <SectionTags />
                        {!tags_hide && <Items>{tags.map(this.renderItem)}</Items>}
                    </>)}
                    
                    {!!filters.length && (<>
                        <SectionFilters />
                        {!filters_hide && <Items>{filters.map(this.renderItem)}</Items>}
                    </>)}
                </Scroll>
            </Wrap>
        )
    }
}

export default connect(
    (state) => ({
        filters_hide: state.config.filters_hide,
        tags_hide: state.config.tags_hide
    })
)(SearchSuggestionsPage)