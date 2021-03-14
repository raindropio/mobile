import React, { useCallback } from 'react'
import t from 't'
import Header from 'co/navigation/header'

export default function BookmarkEditHeader({ status, item: { type }, navigation }) {
    const cancel = useCallback(()=>{
        navigation.setParams({ cancel: true })
        setTimeout(navigation.goBack)
    }, [navigation])

    //title
    let title
    switch(status) {
        case 'new': title = t.s('newBookmark'); break
        default:    title = t.has(type) ? t.s(type) : t.s('bookmark'); break
    }

    return (<>
        {/* Buttons */}
        <Header.Buttons status={status}>
            {!!(status!='new' && status!='loading') && (
                <Header.Button 
                    bold
                    disabled={status=='saving'}
                    title={t.s('done')}
                    onPress={navigation.goBack} />
            )}
        </Header.Buttons>

        {(status == 'new' || status == 'loading') && (
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