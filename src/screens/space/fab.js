import React from 'react'
import { connect } from 'react-redux'

import { Fab } from 'co/button'

class SpaceFab extends React.Component {
    onFabTap = ()=>
        this.props.navigation.navigate(
            'bookmark', 
            {
                screen: 'add',
                params: {
                    collectionId: this.props.spaceId||-1
                }
            }
        )
    
    render() {
        if (this.props.selectModeEnabled)
            return null

        return (
            <Fab onPress={this.onFabTap} />
        )
    }
}

export default connect(
    ({ bookmarks: { selectMode } })=>({
        selectModeEnabled: selectMode.enabled
    })
)(SpaceFab)