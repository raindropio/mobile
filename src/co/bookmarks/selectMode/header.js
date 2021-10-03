import React, { useMemo } from 'react'
import { View } from 'react-native'
import t from 't'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectMode } from 'data/selectors/bookmarks'
import { cancelSelectMode, selectAll, unselectAll } from 'data/actions/bookmarks'

import { Header as StackHeader } from '@react-navigation/elements'
import Header from 'co/navigation/header'

function CancelSelectMode() {
    const dispatch = useDispatch()

    return (
        <Header.ButtonsWrap>
            <Header.Cancel onPress={()=>dispatch(cancelSelectMode())} />
        </Header.ButtonsWrap>
    )
}

function SelectAll({ spaceId }) {
    const dispatch = useDispatch()
    const getSelectMode = useMemo(()=>makeSelectMode(),[])
    const { all } = useSelector(state=>getSelectMode(state, spaceId))

    return (
        <Header.ButtonsWrap>
            <Header.Button 
                title={all ? t.s('selectNone') : t.s('selectAll')}
                onPress={()=>dispatch(all ? unselectAll(spaceId) : selectAll(spaceId))} />
        </Header.ButtonsWrap>
    )
}

function SelectModeHeader({ spaceId }) {
    const getSelectMode = useMemo(()=>makeSelectMode(),[])
    const { all, ids } = useSelector(state=>getSelectMode(state, spaceId))

    return (
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, width: '100%'}}>
            <StackHeader
                headerTitleAlign='center'
                headerTitle={all ? t.s('all') : `${ids.length} ${t.s('selected')}`}
                headerRight={()=><CancelSelectMode spaceId={spaceId} />}
                headerLeft={()=><SelectAll spaceId={spaceId} />}
                />
        </View>
    )
}

export default SelectModeHeader