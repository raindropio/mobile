import React, { useCallback } from 'react'
import { Platform } from 'react-native'
import Share from 'react-native-share'

import Button from 'co/button'
import { Toolbar, Space } from './style'

export default function OpenInternalFooter({ bookmark, navigation }) {
    const onBack = useCallback(()=>
        navigation.pop(),
        [navigation]
    )

    const onShare = useCallback(()=>
        Share.open({
            title: bookmark.title,
            url: bookmark.link,
            failOnCancel: false
        }),
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
            <Button icon='arrow-left' color='text.secondary' onPress={onBack} />

            <Space />

            <Button icon={Platform.select({ default: 'upload-2', android: 'share' })} onPress={onShare} />
            <Button icon={Platform.select({ default: 'safari', android: 'chrome' })} onPress={onOpen} />
            <Button icon='more' onPress={onEdit} />
        </Toolbar>
    )
}