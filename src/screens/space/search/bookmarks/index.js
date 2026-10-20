import useSpaceId from '../useSpaceId'
import Bookmarks from 'co/bookmarks/items'

export default function SearchBookmarks({ route: { params }, navigation }) {
    const spaceId = useSpaceId(params)

    const onCollectionPress = spaceId=>
        navigation.push('space/browse', { spaceId })

    return (
        <Bookmarks
            key={spaceId}
            spaceId={spaceId}
            onCollectionPress={onCollectionPress} />
    )
}