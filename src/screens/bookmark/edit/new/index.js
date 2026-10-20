import { useState } from 'react'
import t from 't'

import Button, { Buttons } from 'co/button'

export default function BookmarkEditNew({ status, save, navigation }) {
    //is new? (stays true while saving, resets once loaded)
    const [isNew, setIsNew] = useState(status == 'new')
    const [prevStatus, setPrevStatus] = useState(status)
    if (status != prevStatus) {
        setPrevStatus(status)
        if (status == 'new')
            setIsNew(true)
        else if (status == 'loaded')
            setIsNew(false)
    }

    const create = async()=>{
        if (await save(false))
            navigation.goBack()
    }

    if (status == 'loading')
        return (
            <Buttons vertical>
                <Button 
                    background='color.accent'
                    disabled
                    title={t.s('loading')+'…'}
                    bold />
            </Buttons>
        )

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

            <Button 
                title={t.s('cancel')}
                color='text.secondary'
                onPress={navigation.goBack} />
        </Buttons>
    )
}