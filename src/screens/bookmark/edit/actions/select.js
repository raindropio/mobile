import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { selectOne } from 'data/actions/bookmarks'

import Goto from 'co/goto'

function BookmarkEditActionSelect({ spaceId, item: { _id }, selectOne, navigation }) {
    if (!spaceId)
        return null

    const onPress = React.useCallback(()=>{
        selectOne(spaceId, _id)
		navigation.goBack()
    }, [spaceId, _id])

    return (
        <Goto 
            label={t.s('select')}
            icon='checkbox-multiple'
            action=''
            onPress={onPress} />
    )
}

export default connect(
	undefined,
	{ selectOne }
)(BookmarkEditActionSelect)