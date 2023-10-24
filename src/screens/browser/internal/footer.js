import { useCallback } from 'react';
import { Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { highlights as getHighlights } from 'data/selectors/bookmarks'
import system from '../system'

import shareBookmark from 'co/bookmarks/item/share'
import Button from 'co/button'
import { Toolbar } from './style'

export default function OpenInternalFooter({ navigation, bookmark, view }) {
    const highlights = useSelector(state=>getHighlights(state, bookmark._id))

    const onBack = useCallback(()=>
        navigation.pop(),
        [navigation]
    )

    const onFont = useCallback(()=>
        navigation.navigate('browser/font'),
        [bookmark]
    )

    const onHighlights = useCallback(()=>
        navigation.navigate('bookmark/highlights', { _id: bookmark._id }),
        [bookmark]
    )

    const onShare = useCallback(()=>
        shareBookmark(bookmark),
        [bookmark]
    )

    const onOpen = useCallback(()=>
        system({ bookmark }),
        [bookmark]
    )

    const onEdit = useCallback(()=>
        navigation.navigate('bookmark/edit', { _id: bookmark._id }),
        [navigation, bookmark]
    )

    return (
        <Toolbar>
            {Platform.OS == 'ios' ? (
                <Button 
                    icon='arrow-left' 
                    color='text.secondary' 
                    onPress={onBack} />
            ) : null}

            {view == 'article' ? (
                <Button 
                    icon='font-size' 
                    onPress={onFont} />
            ) : null}

            <Button 
                badge={highlights.length}
                icon='markup' 
                onPress={onHighlights} />

            <Button 
                icon={Platform.select({ default: 'upload-2', android: 'share' })} 
                onPress={onShare} />

            <Button 
                icon={Platform.select({ default: 'safari', android: 'chrome' })} 
                onPress={onOpen} />

            <Button 
                icon='more' 
                onPress={onEdit} />
        </Toolbar>
    )
}