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

    onShowAllPress = ()=>
        this.setState({ compact: false })

    renderItem = (item)=>
        this.props.renderItem({ item })

    render() {
        const { tags, filters } = this.props
        const { compact } = this.state

        return (
            <Wrap>
                <Scroll>
                    <SectionTags />
                    <Items>
                        {(compact ? tags.slice(0, 30) : tags).map(this.renderItem)}
                        {compact && (
                            <Button onPress={this.onShowAllPress}>
                                <IconWrap>
                                    <Icon name='arrow-down-s' />
                                </IconWrap>
                                <Label>{t.s('showAll')}</Label>
                            </Button>
                        )}
                    </Items>
                    
                    <SectionFilters />
                    <Items>{filters.map(this.renderItem)}</Items>
                </Scroll>
            </Wrap>
        )
    }
}

export default SearchSuggestionsPage