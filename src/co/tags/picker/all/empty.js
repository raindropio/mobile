import React, { useCallback } from 'react'
import t from 't'
import {
	EmptyView,
	EmptyTitle,
	EmptySubTitle,
	EmptyImageIcon
} from 'co/style/empty'
import Button from 'co/button'

export default function TagsPickerAllEmpty({ selected, value, onTabChange }) {
    if (value || !selected.length)
        return null

    const onShowSelectedPress = useCallback(()=>{
        onTabChange(1)
    }, [onTabChange])

    return (
        <EmptyView>
            <EmptyImageIcon name='hashtag' size='32' />
            <EmptyTitle>{`${selected.length} ${t.s('selected')}`}</EmptyTitle>
            <EmptySubTitle />

            <Button 
                onPress={onShowSelectedPress}
                bold
                title={t.s('show')+' '+t.s('selected')} />
        </EmptyView>
    )
}