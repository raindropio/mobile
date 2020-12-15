import React from 'react'
import t from 't'
import Share from 'react-native-share'

import Goto from 'co/goto'

export default function BookmarkEditActionShare({ item: { link: url, title } }) {
    const onPress = React.useCallback(()=>{
        Share.open({
			title,
			url,
			failOnCancel: false
		})
    }, [title, url])

    return (
        <Goto 
            label={t.s('share')}
            icon='upload-2'
            onPress={onPress} />
    )
}