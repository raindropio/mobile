import React, { useCallback } from 'react'
import t from 't'
import Header from 'co/navigation/header'

export default function BookmarkEditHeader({ status, item: { type }, navigation }) {
    const cancel = useCallback(()=>{
        navigation.setParams({ closeBehaviour: 'cancel' })
        setTimeout(navigation.goBack)
    }, [navigation])

    //title
    let title
    switch(status) {
        case 'new': title = t.s('newBookmark'); break
        default:    title = t.has(type) ? t.s(type) : t.s('bookmark'); break
    }

    const cancelable = (status == 'new' || status == 'loading' || status == 'saving')

    return (<>
        {/* Buttons */}
        <Header.Buttons status={status}>
            {!cancelable && (
                <Header.Button 
                    bold
                    disabled={status=='saving'}
                    title={t.s('done')}
                    onPress={navigation.goBack} />
            )}
        </Header.Buttons>

        {!!cancelable && (
            <Header.Buttons left a>
                <Header.Cancel onPress={cancel} />
            </Header.Buttons>
        )}

        {/* Title */}
        <Header.Title title={title}>
            {title}
        </Header.Title>
    </>)
}