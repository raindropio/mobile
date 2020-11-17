import React from 'react'
import t from 't'
import { ButtonLink } from 'co/common/button'
import Icon from 'co/icon'

export default function SelectedFooter({ onTabChange }) {
    return (
        <ButtonLink onPress={()=>onTabChange(1)}>
            {t.s('showAll')} {t.s('tags').toLowerCase()}
        </ButtonLink>
    )
}