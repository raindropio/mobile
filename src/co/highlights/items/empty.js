import React from 'react'
import {
	EmptyView,
	EmptyTitle,
    EmptySubTitle,
	EmptyImageIcon,
    EmptyViewSpace
} from 'co/style/empty'
import Add from './add'

export default function HighlightsItemsEmpty({ _id }) {
    return (
        <EmptyView>
            <EmptyImageIcon name='edit-2' size='32' />
            <EmptyTitle>No highlights</EmptyTitle>
            <EmptySubTitle>
                Select the text that you would like to highlight, then tap the color button
            </EmptySubTitle>
            <EmptyViewSpace /><EmptyViewSpace />
            <Add _id={_id} />
        </EmptyView>
    )
}