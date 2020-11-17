import React from 'react'
import t from 't'
import Goto from 'co/common/goto'

export default function AllFooter({ value, onSubmit }) {
    if (!value)
        return null

    return (
        <Goto 
            last
            icon='add'
            label={t.s('create')+' '+value+' '+t.s('tag')}
            color='accent'
            action=''
            onPress={onSubmit} />
    )
}