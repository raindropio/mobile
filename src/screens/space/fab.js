import React from 'react'
import { connect } from 'react-redux'
import Appearance from 'co/collections/item/appearance'

import Fab from 'co/fab'
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
            <Appearance _id={this.context.spaceId}>
                <Fab onPress={this.onFabTap} />
            </Appearance>
        )
    }
}

export default connect(
    ({ bookmarks: { selectMode } })=>({
        selectModeEnabled: selectMode.enabled
    })
)(SpaceFab)