import React, { useCallback } from 'react'
import { Platform } from 'react-native'
import t from 't'
import Header from 'co/navigation/header'
import { Logo } from './style'

export default function BookmarkEditHeader({ status, item: { type }, navigation }) {
    const extensionSettings = useCallback(()=>{
        navigation.navigate('settings', { screen: 'share_extension' })
    }, [navigation])

    //title
    let title
    switch(status) {
        case 'idle':    title = ''; break
        case 'new':     title = t.s('newBookmark'); break
        case 'loading': title = <Logo />; break
        default:        title = t.has(type) ? t.s(type) : t.s('bookmark'); break
    }

    const cancelable = (status == 'new' || status == 'loading' || status == 'saving')

    return (<>
        {/* Buttons */}
        {status == 'new' && (
            <Header.Buttons a>
                <Header.Button 
                    icon='settings-2'
                    color='text.secondary'
                    onPress={extensionSettings} />
            </Header.Buttons>
        )}

        {!!(cancelable && Platform.OS=='ios') && (
            <Header.Buttons left a>
                <Header.Cancel onPress={navigation.goBack} />
            </Header.Buttons>
        )}

        {/* Title */}
        <Header.Title title={title}>
            {title}
        </Header.Title>
    </>)
}