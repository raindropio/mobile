import React from 'react'
import t from 't'
import Items from 'co/highlights/items'

function BookmarkHighlights({ route: { params: { _id } } }) {
    return (
        <Items _id={_id} />
    )
}

BookmarkHighlights.options = {
    title: t.s('highlights'),
    headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0
    }
}

export default BookmarkHighlights