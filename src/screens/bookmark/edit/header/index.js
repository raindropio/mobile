import React from 'react'
import t from 't'
import Header from 'co/navigation/header'
import { Logo } from './style'

export default function BookmarkEditHeader({ status, item: { type }, navigation }) {
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
        <Header.Buttons 
            status={status}
            cancelable={cancelable}>
            {!cancelable && <Header.Done onPress={navigation.goBack} />}
        </Header.Buttons>

        {/* Title */}
        <Header.Title title={title}>
            {title}
        </Header.Title>
    </>)
}