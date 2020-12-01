import React from 'react'
import t from 't'
import Header from 'co/navigation/header'

export default function BookmarkEditHeader({ status, item: { type }, navigation }) {
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
                    title={t.s('done')}
                    onPress={navigation.goBack} />
            )}
        </Header.Buttons>

        {/* Title */}
        <Header.Title type={type}>
            {t.has(type) ? t.s(type) : t.s('bookmark')}
        </Header.Title>
    </>)
}