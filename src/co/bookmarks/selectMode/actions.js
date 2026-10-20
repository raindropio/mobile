import { useMemo } from 'react'
import t from 't'
import { Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { makeSelectMode } from 'data/selectors/bookmarks'
import { importantSelected, screenshotSelected, removeSelected } from 'data/actions/bookmarks'

import { Wrap } from './actions.style'
import Action from './action'

export default function SelectModeActions({ spaceId, navigation }) {
    const dispatch = useDispatch()
    const getSelectMode = useMemo(()=>makeSelectMode(), [])
    const { all, ids } = useSelector(state=>getSelectMode(state, spaceId))
    const count = ids.length

    const countLabel = t.format('bookmarksCount', all ? t.s('all') : count)

    const onRemove = ()=>
        Alert.alert(`${t.s('remove')} ${countLabel}?`, '',[
            {
                text: t.s('remove')+' '+countLabel, 
                style: 'destructive', 
                onPress:()=>dispatch(removeSelected(spaceId))},
            {
                text: t.s('cancel'), 
                style: 'cancel'
            }
        ])

    const onMore = ()=>
        Alert.alert(
            countLabel,
            null,
            [
                { text: t.s('clickToMakeScreenshot'), onPress: ()=>dispatch(screenshotSelected(spaceId)) },
                { text: t.s('addToFavorites'), onPress: ()=>dispatch(importantSelected(spaceId)) },
                { text: t.s('removeFromFavorites'), style: 'destructive', onPress: ()=>dispatch(importantSelected(spaceId, false)) },
                { text: t.s('cancel'), style: 'cancel' }
            ],
            { cancelable: true }
        )

    const disabled = !all && !count

    return (
        <Wrap>
            <Action 
                disabled={disabled}
                icon='folder-transfer'
                title={t.s('move')}
                onPress={()=>navigation.navigate('bookmarks/move', { spaceId })} />

            <Action 
                disabled={disabled}
                icon='hashtag' 
                title={t.s('addTags')}
                onPress={()=>navigation.navigate('bookmarks/tag', { spaceId })} />

            <Action 
                disabled={disabled}
                icon='delete-bin' 
                title={t.s('remove')}
                onPress={onRemove}/>

            <Action 
                disabled={disabled}
                icon='more'
                title={t.s('more')}
                onPress={onMore} />
        </Wrap>
    )
}