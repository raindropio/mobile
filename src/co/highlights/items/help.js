import React, { useCallback } from 'react'
import { Linking } from 'react-native'
import t from 't'
import { links } from 'config'

import Goto from 'co/goto'
import { Form } from 'co/form'

export default function HighlightsItemsAdd() {
    const onPress = useCallback(()=>{
        Linking.openURL(links.help.highlights)
    }, [])

    return (
        <Form>
            <Goto
                last
                icon='question'
                label={t.s('howToUse')}
                onPress={onPress} />
        </Form>
    )
}