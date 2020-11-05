import React from 'react'
import Fab from 'co/fab'
import Context from './context'

export default class SpaceFab extends React.Component {
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
        return <Fab onPress={this.onFabTap} />
    }
}