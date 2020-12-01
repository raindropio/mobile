import t from 't'
import React from 'react'
import Goto from 'co/goto'

export default class AddBookmarkCollection extends React.Component {
    onPress = ()=>{
        this.props.navigation.replace('collection', {
            screen: 'add',
            params: {
                parentId: this.props.collectionId > 0 ? this.props.collectionId : undefined,
                onSuccess: ({ _id })=>
                    this.props.navigation.navigate('browse', { spaceId: _id })
            }
        })
    }

    render() {
        return (
            <Goto 
                last={this.props.last}
                icon='folder-add'
                color='blue'
                label={t.s(this.props.collectionId > 0 ? 'createSubFolder' : 'createNewCollection')}
                onPress={this.onPress} />
        )
    }
}