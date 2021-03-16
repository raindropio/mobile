import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { makeSelectMode } from 'data/selectors/bookmarks'
import { cancelSelectMode, selectAll, unselectAll } from 'data/actions/bookmarks'

import { Header as StackHeader } from '@react-navigation/stack'
import Header from 'co/navigation/header'

function CancelSelectMode({ cancelSelectMode }) {
    return (
        <Header.ButtonsWrap>
            <Header.Cancel onPress={cancelSelectMode} />
        </Header.ButtonsWrap>
    )
}

function SelectAll({ spaceId, all, selectAll, unselectAll }) {
    return (
        <Header.ButtonsWrap>
            <Header.Button 
                title={all ? t.s('selectNone') : t.s('selectAll')}
                onPress={()=>all ? unselectAll(spaceId) : selectAll(spaceId)} />
        </Header.ButtonsWrap>
    )
}

function SelectModeHeader({ scene, ...etc }) {
    return (
        <StackHeader 
            {...etc}
            scene={{
                ...scene,
                descriptor: {
                    ...scene.descriptor,
                    options: {
                        ...scene.descriptor.options,
                        headerTransparent: false,
                        headerTitleAlign: undefined,
                        headerTitleContainerStyle: undefined,
                        headerTitle: etc.all ? t.s('all') : `${etc.count} ${t.s('selected')}`,
                        headerLeft: ()=><CancelSelectMode {...etc} />,
                        headerRight: ()=><SelectAll {...etc} />
                    }
                }
            }} />
    )
}

export default connect(
    () => {
        const getSelectMode = makeSelectMode()

        return (state, { spaceId })=>{
            const selectMode = getSelectMode(state, spaceId)
    
            return {
                all: selectMode.all,
                count: selectMode.ids.length
            }
        }
    },
    { cancelSelectMode, selectAll, unselectAll }
)(
    React.memo(
        SelectModeHeader
    )
)