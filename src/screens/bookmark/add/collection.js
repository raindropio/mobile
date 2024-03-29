import t from 't'
import { Component } from 'react';
import Goto from 'co/goto'

export default class AddBookmarkCollection extends Component {
    onPress = ()=>{
        this.props.navigation.goBack()

        setTimeout(()=>{
            this.props.navigation.navigate('collection/add', {
                parentId: this.props.collectionId > 0 ? this.props.collectionId : undefined,
                onSuccess: ({ _id })=>
                    this.props.navigation.navigate('space/browse', { spaceId: _id })
            })
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