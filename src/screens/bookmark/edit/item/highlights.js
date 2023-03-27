import { useCallback } from 'react';
import t from 't'
import { useSelector } from 'react-redux'
import { highlights as getHighlights } from 'data/selectors/bookmarks'

import Goto from 'co/goto'

export default function BookmarkEditActionHighlights({ _id, item, navigation }) {
    const highlights = useSelector(state=>getHighlights(state, item._id || _id))

    const onPress = useCallback(()=>{
        navigation.navigate('bookmark', { screen: 'highlights', params: { _id: item._id || _id } })
    }, [item._id, _id, navigation])

    return (
        <Goto 
            label={t.s('highlights')}
            subLabel={highlights.length ? highlights.length : ''}
            subLabelBadge={highlights.length ? true : false}
            icon='markup'
            variant={highlights.length ? 'fill' : undefined}
            onPress={onPress} />
    )
}