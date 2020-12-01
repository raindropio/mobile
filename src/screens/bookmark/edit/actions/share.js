import React from 'react'
import t from 't'
import { Share } from 'react-native'

import Goto from 'co/goto'

export default function BookmarkEditActionShare({ item: { link } }) {
    const onPress = React.useCallback(()=>{
        Share.share({
            message: link,
            url: link,
        })
    }, [link])

    return (
        <Goto 
            label={t.s('share')}
            icon='upload-2'
            onPress={onPress} />
    )
}