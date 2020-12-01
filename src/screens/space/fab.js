import React from 'react'
import { connect } from 'react-redux'
import Tint from 'co/collections/item/tint'

import { Fab } from 'co/button'
import Context from './context'

class SpaceFab extends React.Component {
    static contextType = Context

    onFabTap = ()=>
        this.props.navigation.navigate(
            'bookmark', 
            {
                screen: 'add',
                params: {
                    collectionId: this.context.spaceId||-1
                }
            }
        )
    
    render() {
        if (this.props.selectModeEnabled)
            return null

        return (
            <Tint _id={this.context.spaceId}>
                <Fab onPress={this.onFabTap} />
            </Tint>
        )
    }
}

export default connect(
    ({ bookmarks: { selectMode } })=>({
        selectModeEnabled: selectMode.enabled
    })
)(SpaceFab)