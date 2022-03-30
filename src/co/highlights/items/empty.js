import React from 'react'
import { useTheme } from 'styled-components'
import {
	EmptyView,
	EmptyTitle,
    EmptySubTitle,
	EmptyImageIcon,
    EmptyViewSpace
} from 'co/style/empty'
import Add from './add'

export default function HighlightsItemsEmpty({ _id }) {
    const { isExtension } = useTheme()

    return (
        <EmptyView>
            <EmptyImageIcon 
                name='markup' 
                color='highlights'
                size='48' />
                
            <EmptyTitle>No highlights</EmptyTitle>
            {!isExtension ? (
                <EmptySubTitle>
                    Select the text that you would like to highlight, then tap the color button
                </EmptySubTitle>
            ) : null}
            <EmptyViewSpace /><EmptyViewSpace />
            <Add _id={_id} />
        </EmptyView>
    )
}