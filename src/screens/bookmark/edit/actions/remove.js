import { useCallback, useMemo } from 'react'
import { Alert } from 'react-native'
import _ from 'lodash'
import t from 't'
import { connect } from 'react-redux'
import { oneRemove } from 'data/actions/bookmarks'

import Goto from 'co/goto'

function BookmarkEditActionRemove({ item: { _id, collectionId }, oneRemove, navigation, last }) {
    const onPress = useCallback(()=>{
        oneRemove(_id, navigation.goBack, error=>Alert.alert(t.s('error'), error?.message))
    }, [_id])

    const title = useMemo(()=>{
        if (collectionId==-99)
            return `${t.s('remove')} ${t.s('from')} ${t.s('defaultCollection--99').toLowerCase()}`
        else
            return _.capitalize(t.s('move'))+' '+t.s('to')+' '+t.s('defaultCollection--99').toLowerCase()
    }, [ collectionId ])

    return (
        <Goto 
            last={last}
            label={title}
            action=''
            icon='delete-bin'
            color='danger'
            onPress={onPress} />
    )
}

export default connect(
	undefined,
	{ oneRemove }
)(BookmarkEditActionRemove)