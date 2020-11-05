import t from 't'
import React from 'react'
import Goto from 'co/common/goto'

export default class AddBookmarkCollection extends React.Component {
    onPress = ()=>{
        this.props.navigation.replace('collection', {
            screen: 'add',
            params: {
                parentId: this.props.collectionId > 0 ? this.props.collectionId : undefined
            }
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