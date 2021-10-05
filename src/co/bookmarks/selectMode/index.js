import React from 'react'
import { connect } from 'react-redux'
import { makeSelectMode } from 'data/selectors/bookmarks'
import { cancelSelectMode } from 'data/actions/bookmarks'

import Header from './header'
import Actions from './actions'
import Working from './working'

function BookmarksSelectMode({ enabled, working, navigation, spaceId, cancelSelectMode }) {
    //back
    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!enabled) return
                e.preventDefault()
                cancelSelectMode(spaceId)
            }),
        [enabled]
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
            {!!enabled && <Header spaceId={spaceId} />}
            
            <Actions
                spaceId={spaceId}
                navigation={navigation} />
        </>
    )
}

export default connect(
	() => {
        const getSelectMode = makeSelectMode()

        return (state, { spaceId })=>{
            const selectMode = getSelectMode(state, spaceId)
    
            return {
                enabled: selectMode.enabled,
                working: selectMode.working,
            }
        }
    },
    { cancelSelectMode }
)(BookmarksSelectMode)