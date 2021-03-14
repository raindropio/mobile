import React, { useState, useEffect } from 'react'
import t from 't'

import Button, { Buttons } from 'co/button'

export default function BookmarkEditNew({ status, navigation }) {
    const [isNew, setIsNew] = useState(false)
    useEffect(()=>{
        if (status == 'new')
            setIsNew(true)
    }, [status])

    if (!isNew)
        return null

    return (
        <Buttons vertical>
            <Button 
                background='color.accent'
                disabled={status == 'saving'}
                title={t.s('create')+' '+t.s('bookmark').toLowerCase()}
                bold
                onPress={navigation.goBack} />
        </Buttons>
    )
}