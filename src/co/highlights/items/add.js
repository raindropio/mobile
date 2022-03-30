import React, { useCallback } from 'react'
import { Linking, View, Platform } from 'react-native'
import t from 't'
import { useTheme } from 'styled-components'
import { links } from 'config'
import { useDispatch } from 'react-redux'
import { draftCommit } from 'data/actions/bookmarks'

import { Info } from 'co/alert'
import { Form } from 'co/form'
import Goto from 'co/goto'

export default function HighlightsItemsAdd({ _id }) {
    const { isExtension } = useTheme()
    const dispatch = useDispatch()

    const onAddPress = useCallback(()=>{
        dispatch(
            draftCommit(_id, item=>
                Linking.openURL(`rnio://open/internal?bookmark=${encodeURIComponent(JSON.stringify(item))}`)
            )
        )
    }, [_id])
    const onHelpPress = useCallback(()=>Linking.openURL(links.help.highlights), [])

    return (
        <View style={{width: '100%'}}>
            <Form>
                {isExtension && Platform.OS=='ios' ? (
                    <Info 
                        icon='safari'
                        message='Enable Raindrop.io Safari Extension or open Raindrop.io app to add new highlights' />
                ) : (<>
                    {isExtension ? (
                        <Goto
                            icon='add-box' variant='fill' color='accent'
                            action='arrow-right-up'
                            label={t.s('add')+' '+t.s('highlights').toLowerCase()}
                            onPress={onAddPress} />
                    ) : null}
    
                    <Goto
                        last
                        icon='question'
                        action='arrow-right-up'
                        label={t.s('howToUse')}
                        onPress={onHelpPress} />
                </>)}
            </Form>
        </View>
    )
}