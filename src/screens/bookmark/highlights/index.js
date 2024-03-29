import t from 't'
import Items from 'co/highlights/items'

function BookmarkHighlights({ route: { params: { _id } } }) {
    return (
        <Items _id={_id} />
    )
}

BookmarkHighlights.options = {
    title: t.s('highlights')
}

export default BookmarkHighlights