import React from 'react'
import t from 't'

import { Wrap, Scroll, Items } from './page.style'
import SectionTags from 'co/tags/section'
import SectionFilters from 'co/filters/section'
import { Button, Label, IconWrap } from './item.style'
import Icon from 'co/icon'

class SearchSuggestionsPage extends React.Component {
    state = {
        compact: true
    }

    stickyHeaderIndices = [0, 2]

    onShowAllPress = ()=>
        this.setState({ compact: false })

    renderItem = (item)=>
        this.props.renderItem({ item })

    render() {
        const { tags, filters } = this.props
        const { compact } = this.state
        const reduced = (compact && tags.length > 30)

        return (
            <Wrap>
                <Scroll stickyHeaderIndices={this.stickyHeaderIndices}>
                    {!!tags.length && (<>
                        <SectionTags hidden={false} />
                        <Items>
                            {(reduced ? tags.slice(0, 30) : tags).map(this.renderItem)}
                            
                            {!!reduced && (
                                <Button onPress={this.onShowAllPress}>
                                    <IconWrap>
                                        <Icon name='arrow-down-s' />
                                    </IconWrap>
                                    <Label>{t.s('showAll')}</Label>
                                </Button>
                            )}
                        </Items>
                    </>)}
                    
                    {!!filters.length && (<>
                        <SectionFilters hidden={false} />
                        <Items>{filters.map(this.renderItem)}</Items>
                    </>)}
                </Scroll>
            </Wrap>
        )
    }
}

export default SearchSuggestionsPage