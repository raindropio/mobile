import { Component } from 'react';
import { connect } from 'react-redux'

import { Fab } from 'co/button'

class SpaceFab extends Component {
    onFabTap = ()=>
        this.props.navigation.navigate('bookmark/add', { collectionId: this.props.spaceId||-1 })
    
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