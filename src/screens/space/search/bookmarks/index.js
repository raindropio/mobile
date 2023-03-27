import { useCallback } from 'react';

import useSpaceId from '../useSpaceId'
import Bookmarks from 'co/bookmarks/items'

export default function SearchBookmarks({ route: { params }, navigation }) {
    const spaceId = useSpaceId(params)

    const onCollectionPress = useCallback(spaceId=>
        navigation.push('browse', { spaceId }),
        [spaceId]
    )

    return (
        <Bookmarks
            key={spaceId}
            spaceId={spaceId}
            onCollectionPress={onCollectionPress} />
    )
}