import t from 't'
import Goto from 'co/goto'

export default function BookmarkEditTagsField({ navigation, last, item: { tags = [] }, _id }) {
    const onPress = ()=>
        navigation.navigate('bookmark/tags', { _id, autoCommit: false })

    const tagsString = tags.join(', ')

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