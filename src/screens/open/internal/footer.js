import React, { useCallback } from 'react'
import { Platform } from 'react-native'

import shareBookmark from 'co/bookmarks/item/share'
import Button from 'co/button'
import { Toolbar } from './style'

export default function OpenInternalFooter({ navigation, bookmark, view }) {
    const onBack = useCallback(()=>
        navigation.pop(),
        [navigation]
    )

    const onFont = useCallback(()=>
        navigation.push('open', { screen: 'font' }),
        [bookmark]
    )

    const onShare = useCallback(()=>
        shareBookmark(bookmark),
        [bookmark]
    )

    const onOpen = useCallback(()=>
        navigation.push('open', { screen: 'system', params: { bookmark } }),
        [navigation, bookmark]
    )

    const onEdit = useCallback(()=>
        navigation.push('bookmark', { screen: 'edit', params: { _id: bookmark._id } }),
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
            ) : (Platform.OS == 'ios' ? <Button disabled /> : null)}

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