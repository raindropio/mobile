import { useCallback } from 'react';
import { Linking, View, Platform } from 'react-native'
import t from 't'
import { useTheme } from 'styled-components'
import { links } from 'config'
import { useDispatch, useSelector } from 'react-redux'
import { bookmark as getBookmark, getDraftItem } from 'data/selectors/bookmarks'
import { draftCommit } from 'data/actions/bookmarks'

import { Info } from 'co/alert'
import { Form } from 'co/form'
import Goto from 'co/goto'

export default function HighlightsItemsAdd({ _id }) {
    const { isExtension } = useTheme()
    const dispatch = useDispatch()
    const bookmark = useSelector(state=>(typeof _id == 'number' ? getBookmark : getDraftItem)(state, _id))

    const onAddPress = useCallback(()=>{
        function open(item) {
            Linking.openURL(`rnio://open/internal?bookmark=${encodeURIComponent(JSON.stringify(item))}`)
        }
        if (typeof _id == 'number')
            open(bookmark)
        else
            dispatch(draftCommit(_id, ([item])=>open(item)))
    }, [bookmark, _id])

    const onHelpPress = useCallback(()=>Linking.openURL(links.help.highlights.index), [])

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
                            label={t.s('add')+' '+t.s('highlights').toLowerCase()+' '+t.s('in')+' '+t.s('app').toLowerCase()}
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