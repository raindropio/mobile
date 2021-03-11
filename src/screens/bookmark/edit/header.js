import React, { useCallback } from 'react'
import t from 't'
import Header from 'co/navigation/header'

export default function BookmarkEditHeader({ status, item: { type }, navigation }) {
    const cancel = useCallback(()=>{
        navigation.setParams({ cancel: true })
        setTimeout(navigation.goBack)
    }, [navigation])

    return (<>
        {/* Buttons */}
        <Header.Buttons status={status}>
            {status=='saving' ? (
                <Header.Button 
                    disabled
                    title={t.s('save')+'…'} />
            ) : (
                <Header.Button 
                    bold
                    title={status == 'new' ? t.s('save') : t.s('done')}
                    onPress={navigation.goBack} />
            )}
        </Header.Buttons>

        {(status == 'new' || status == 'loading') && (
            <Header.Buttons left a>
                <Header.Cancel onPress={cancel} />
            </Header.Buttons>
        )}

        {/* Title */}
        <Header.Title type={type}>
            {status == 'new' ? t.s('newBookmark') : (t.has(type) ? t.s(type) : t.s('bookmark'))}
        </Header.Title>
    </>)
}