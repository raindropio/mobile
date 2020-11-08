import React from 'react'
import t from 't'
import { connect } from 'react-redux'
import { makeSelectMode } from 'data/selectors/bookmarks'
import { cancelSelectMode, selectAll, unselectAll } from 'data/actions/bookmarks'

import { Header } from '@react-navigation/stack'
import { ButtonsWrap, Button } from 'co/navigation/header'

function Cancel({ spaceId, cancelSelectMode }) {
    return (
        <ButtonsWrap>
            <Button 
                title={t.s('cancel')}
                onPress={()=>cancelSelectMode(spaceId)} />
        </ButtonsWrap>
    )
}

function SelectAll({ spaceId, count, selectAll, unselectAll }) {
    return (
        <ButtonsWrap>
            <Button 
                title={t.s('selectAll')}
                onPress={()=>selectAll(spaceId)} />
        </ButtonsWrap>
    )
}

function SelectModeHeader({ scene, ...etc }) {
    return (
        <Header 
            {...etc}
            scene={{
                ...scene,
                descriptor: {
                    ...scene.descriptor,
                    options: {
                        ...scene.descriptor.options,
                        headerTitle: `${etc.count} ${t.s('selected')}`,
                        headerLeft: ()=><Cancel {...etc} />,
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