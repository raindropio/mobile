import React, { useState, useMemo, useCallback } from 'react'
import t from 't'

import { Wrap, Scroll, Items } from './page.style'
import SectionTags from 'co/tags/section'
import SectionFilters from 'co/filters/section'
import { Button, Label, IconWrap } from './item.style'
import Icon from 'co/icon'

export default function SearchSuggestionsPage({ tags, filters, renderItem }) {
    //compact
    const [compact, setCompact] = useState(true)
    const onShowAllPress = useCallback(() => {
        setCompact(false)
    }, [])

    const reduced = useMemo(()=>
        (compact && tags.length > 30)
    , [tags.length, compact])

    //sticky
    const stickyHeaderIndices = useMemo(()=>[
        ...tags.length ? [0] : [],
        ...filters.length ? [tags.length ? 2 : 0] :[]
    ], [tags, filters])

    //item
    const reRenderItem = useCallback(item=>
        renderItem({item}),
        [renderItem]
    )

    return (
        <Wrap>
            <Scroll stickyHeaderIndices={stickyHeaderIndices}>
                {!!tags.length && (<SectionTags hidden={false} />)}
                {!!tags.length && (
                    <Items>
                        {(reduced ? tags.slice(0, 30) : tags).map(reRenderItem)}
                        
                        {!!reduced && (
                            <Button onPress={onShowAllPress}>
                                <IconWrap>
                                    <Icon name='arrow-down-s' />
                                </IconWrap>
                                <Label>{t.s('showAll')}</Label>
                            </Button>
                        )}
                    </Items>
                )}
                
                {!!filters.length && (<SectionFilters hidden={false} />)}
                {!!filters.length && (
                    <Items>{filters.map(reRenderItem)}</Items>
                )}
            </Scroll>
        </Wrap>
    )
}