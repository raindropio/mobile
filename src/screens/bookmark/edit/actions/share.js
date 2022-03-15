import React from 'react'
import t from 't'
import Goto from 'co/goto'
import share from 'co/bookmarks/item/share'

export default function BookmarkEditActionShare({ item, navigation }) {
    const onPress = React.useCallback(()=>{
        navigation.goBack()

        setTimeout(() => {
            share(item)
        }, 100)
    }, [item.link])

    return (
        <Goto 
            label={t.s('share')}
            icon='upload-2'
            action=''
            onPress={onPress} />
    )
}