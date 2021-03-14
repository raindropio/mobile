import React, { useState, useEffect, useCallback } from 'react'
import t from 't'

import Button, { Buttons } from 'co/button'

export default function BookmarkEditNew({ status, commit, navigation }) {
    //is new?
    const [isNew, setIsNew] = useState(false)
    useEffect(()=>{
        if (status == 'new')
            setIsNew(true)
        else if (status == 'loaded')
            setIsNew(false)
    }, [status])

    //create button
    const create = useCallback(async()=>{
        navigation.setParams({ closeBehaviour: 'save' })
        setTimeout(navigation.goBack)
    }, [])

    if (!isNew)
        return null

    return (
        <Buttons vertical>
            <Button 
                background='color.accent'
                disabled={status == 'saving'}
                title={t.s('save')}
                bold
                onPress={create} />
        </Buttons>
    )
}