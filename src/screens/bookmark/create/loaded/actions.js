import React from 'react'
import t from 't'
import { useDispatch } from 'react-redux'
import { oneImportant } from 'data/actions/bookmarks'
import { Actions, Action } from './actions.style'

export default function BookmarkCreateLoadedActions({ items, navigation }) {
    if (items.length != 1)
        return null

    const dispatch = useDispatch()

    //tags press
    const onTagsPress = React.useCallback(()=>{
        navigation.replace('bookmark', {
            screen: 'tags',
            params: {
                _id: items[0]._id
            }
        })
    }, [items[0]._id, navigation])

    //important press
    const onImportantPress = React.useCallback(()=>{
        dispatch(
            oneImportant(items[0]._id)
        )
    }, [items[0]._id])

    //edit press
    const onEditPress = React.useCallback(()=>{
        navigation.replace('bookmark', {
            screen: 'edit',
            params: {
                _id: items[0]._id
            }
        })
    }, [items[0]._id, navigation])

    return (
        <Actions>
            <Action
                icon='hashtag'
                background='regular'
                color='accent'
                vertical
                fontSize='tertiary'
                title={t.s('tags')}
                onPress={onTagsPress} />

            <Action
                background='regular'
                color='accent'
                icon='heart-3'
                variant={items[0].important ? 'fill' : 'line'}
                vertical
                fontSize='tertiary'
                title={t.s('favorites')}
                onPress={onImportantPress} />

            <Action
                icon='edit-box'
                background='regular'
                color='accent'
                vertical
                fontSize='tertiary'
                title={t.s('editMin')}
                onPress={onEditPress} />
        </Actions>
    )
}