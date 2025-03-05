import t from 't'
import { useCallback, useMemo } from 'react'
import Goto from 'co/goto'

export default function BookmarkEditTagsField({ navigation, last, item: { tags = [] }, _id }) {
    const onPress = useCallback(() => {
        navigation.navigate('bookmark/tags', { _id, autoCommit: false })
    }, [navigation, _id])

    const tagsString = useMemo(()=>tags.join(', '), [tags])

    return (
        <Goto
            last={last}
            icon="hashtag"
            onPress={onPress}
            label={tagsString || t.s('tags')}
            subLabel={tags.length ? tags.length : ''}
            subLabelBadge={!!tags.length}
        />
    )
}