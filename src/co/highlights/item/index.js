import { useDispatch } from 'react-redux'
import { highlightUpdate, highlightRemove } from 'data/actions/bookmarks'

import View from './view'

export default function HighlightsItem(props) {
    const { bookmarkId, _id } = props

    const dispatch = useDispatch()

    const onChange = changed=>
        dispatch(highlightUpdate(bookmarkId, _id, changed))

    const onRemove = ()=>{
        dispatch(highlightRemove(bookmarkId, _id))
    }

    return (
        <View
            {...props}
            onChange={onChange}
            onRemove={onRemove} />
    )
}