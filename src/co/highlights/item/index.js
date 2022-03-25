import t from 't'
import React, { useCallback } from 'react'
import { Alert } from 'react-native'
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
        Alert.alert(t.s('areYouSure'), '', [
            {
                text: t.s('remove'),
                style: 'destructive',
                onPress: ()=>dispatch(highlightRemove(bookmarkId, _id))
            },
            {
                text: t.s('cancel'),
                style: 'cancel'
            }
        ])
    }, [bookmarkId, _id])

    return (
        <View
            {...props}
            onChange={onChange}
            onRemove={onRemove} />
    )
}