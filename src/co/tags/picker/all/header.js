import React from 'react'
import _ from 'lodash'
import Goto from 'co/common/goto'

export default function AllFooter({ value, tags, onSubmit }) {
    if (!value)
        return null

    if (_.find(tags, ['_id', value]))
        return null

    return (
        <Goto 
            last
            icon='add-box'
            variant='fill'
            label={value}
            color='accent'
            action=''
            onPress={onSubmit} />
    )
}