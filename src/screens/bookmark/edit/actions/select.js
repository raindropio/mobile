import t from 't'
import { useDispatch } from 'react-redux'
import { selectOne } from 'data/actions/bookmarks'

import Goto from 'co/goto'

export default function BookmarkEditActionSelect({ spaceId, item: { _id }, navigation }) {
    const dispatch = useDispatch()

    if (!spaceId)
        return null

    const onPress = ()=>{
        dispatch(selectOne(spaceId, _id))
        navigation.goBack()
    }

    return (
        <Goto 
            label={t.s('select')}
            icon='checkbox-multiple'
            action=''
            onPress={onPress} />
    )
}