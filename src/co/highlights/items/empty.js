import React from 'react'
import t from 't'
import {
	EmptyView,
	EmptyTitle,
    EmptySubTitle,
	EmptyImageIcon,
    EmptyViewSpace
} from 'co/style/empty'
import Button from 'co/button'

export default function HighlightsItemsEmpty() {
    return (
        <EmptyView>
            <EmptyImageIcon name='edit-2' size='32' />
            <EmptyTitle>No highlights</EmptyTitle>
            <EmptySubTitle>Select text on a page and tap "Highlight"</EmptySubTitle>
            <EmptyViewSpace />
            <Button
                icon='question'
                title={t.s('help')} />
        </EmptyView>
    )
}