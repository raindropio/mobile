import { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { highlightUpdate, highlightRemove } from 'data/actions/bookmarks'

import View from './view'

export default function HighlightsItem(props) {
    const { bookmarkId, _id } = props

    const dispatch = useDispatch()

    const onChange = useCallback(changed => 
        dispatch(highlightUpdate(bookmarkId, _id, changed)), 
        [bookmarkId, _id]
    )

    const onRemove = useCallback(()=>{
        dispatch(highlightRemove(bookmarkId, _id))
    }, [bookmarkId, _id])

    return (
        <View
            {...props}
            onChange={onChange}
            onRemove={onRemove} />
    )
}