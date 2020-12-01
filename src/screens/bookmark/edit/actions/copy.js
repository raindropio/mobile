import React from 'react'
import t from 't'
import Clipboard from '@react-native-community/clipboard'

import Goto from 'co/goto'

export default function BookmarkEditActionCopy({ item: { link } }) {
    const onPress = React.useCallback(()=>{
        Clipboard.setString(link)
    }, [link])

    return (
        <Goto 
            label={t.s('copyLinkToClipboard')}
            icon='link'
            onPress={onPress} />
    )
}