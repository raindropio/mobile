import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeSelectMode } from 'data/selectors/bookmarks'
import { cancelSelectMode } from 'data/actions/bookmarks'

import Header from './header'
import Actions from './actions'
import Working from './working'

export default function BookmarksSelectMode({ navigation, spaceId }) {
    const dispatch = useDispatch()
    const getSelectMode = useMemo(()=>makeSelectMode(), [])
    const { enabled, working } = useSelector(state=>getSelectMode(state, spaceId))

    //back
    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!enabled) return
                e.preventDefault()
                dispatch(cancelSelectMode(spaceId))
            }),
        [enabled, navigation, spaceId, dispatch]
    )

    if (!enabled)
        return null

    if (working)
        return (
            <Working
                working={working} />
        )

    //actions
    return (
        <>
            <Header spaceId={spaceId} />
            
            <Actions
                spaceId={spaceId}
                navigation={navigation} />
        </>
    )
}