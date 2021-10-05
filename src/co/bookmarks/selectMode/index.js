import React from 'react'
import { connect } from 'react-redux'
import { makeSelectMode } from 'data/selectors/bookmarks'
import { LayoutAnimation } from 'react-native'
import { cancelSelectMode } from 'data/actions/bookmarks'

import Header from './header'
import Actions from './actions'
import Working from './working'

function BookmarksSelectMode({ enabled, working, navigation, spaceId, cancelSelectMode }) {
    //header
    React.useEffect(()=>{
        navigation.setOptions({
            header: enabled ? 
                (params)=><Header {...params} spaceId={spaceId} /> :
                undefined
        })

        return ()=>
            navigation.setOptions({
                header: undefined
            })
    }, [ enabled ])

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

    //animation
    React.useEffect(()=>{
        if (enabled)
            LayoutAnimation.easeInEaseOut()
    }, [ enabled ])

    if (!enabled)
        return null

    if (working)
        return (
            <Working
                working={working} />
        )

    //actions
    return (
        <Actions
            spaceId={spaceId}
            navigation={navigation} />
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