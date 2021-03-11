import React from 'react'
import t from 't'

import Button, { Buttons } from 'co/button'

export default function BookmarkEditNew({ status, navigation }) {
    if (status != 'new')
        return null

    return (
        <Buttons vertical>
            <Button 
                background='color.accent'
                disabled={status == 'saving'}
                title={t.s('save')}
                bold
                onPress={navigation.goBack} />
        </Buttons>
    )
}