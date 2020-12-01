import React from 'react'
import t from 't'
import Goto from 'co/goto'

export default function SelectedFooter({ onTabChange }) {
    return (
        <Goto
            last 
            icon='arrow-left-s'
            action=''
            onPress={()=>onTabChange(0)}
            label={`${t.s('showAll')} ${t.s('tags').toLowerCase()}`} />
    )
}