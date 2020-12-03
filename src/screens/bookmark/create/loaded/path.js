import React from 'react'
import t from 't'
import { ThemeContext } from 'styled-components'
import { Form } from 'co/form'
import CollectionPath from 'co/collections/path'

export default function BookmarkCreateLoadedPath({ navigation, items }) {
    //is extension
    const { isExtension } = React.useContext(ThemeContext)

    //path press
    const onPathPress = React.useCallback(()=>{
        if (items.length == 1)
            navigation.replace('bookmark', {
                screen: 'path',
                params: {
                    _id: items[0]._id
                }
            })
        else if (!isExtension)
            navigation.navigate('browse', {
                spaceId: items[0].collectionId
            })
    }, [items, isExtension])

    //appearance
    let subLabel = ''
    let action

    if (items.length == 1)
        subLabel = t.s('move')
    else if (!isExtension)
        subLabel = t.s('open')
    else
        action = ''

    return (
        <Form>
            <CollectionPath
                _id={items[0].collectionId}
                action={action}
                subLabel={subLabel}
                last
                navigation={navigation}
                onPress={onPathPress} />
        </Form>
    )
}