import t from 't'
import React from 'react'
import Goto from 'co/common/goto'
import Navigation from 'modules/navigation'
import Events from 'modules/events'

export default class AddBookmarkHelp extends React.Component {
    onPress = async()=>{
        await Navigation.close(this.props)
        Events.emit('create-collection', {
            parentId: this.props.collectionId > 0 ? this.props.collectionId : undefined
        })
    }

    render() {
        return (
            <Goto 
                last={this.props.last}
                icon={require('assets/images/addCollection.png')}
                label={t.s(this.props.collectionId > 0 ? 'createSubFolder' : 'createNewCollection')}
                onPress={this.onPress} />
        )
    }
}