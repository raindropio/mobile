import { Alert } from 'react-native'
import t from 't'
import { useDispatch } from 'react-redux'
import { oneRemove } from 'data/actions/bookmarks'

import Goto from 'co/goto'

export default function BookmarkEditActionRemove({ item: { _id, collectionId }, navigation, last }) {
    const dispatch = useDispatch()

    const onPress = ()=>
        dispatch(oneRemove(_id, navigation.goBack, error=>Alert.alert(t.s('error'), error?.message)))

    return (
        <Goto 
            last={last}
            label={collectionId==-99 ? t.s('removeFromTrash') : t.s('moveToTrash')}
            action=''
            icon='delete-bin'
            color='danger'
            onPress={onPress} />
    )
}