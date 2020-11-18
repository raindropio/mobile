import React from 'react'
import t from 't'
import { ButtonLink } from 'co/common/button'

export default function SelectedFooter({ onTabChange }) {
    return (
        <ButtonLink onPress={()=>onTabChange(0)}>
            {t.s('showAll')} {t.s('tags').toLowerCase()}
        </ButtonLink>
    )
}