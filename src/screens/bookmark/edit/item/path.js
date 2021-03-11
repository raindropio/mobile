import React from 'react'
import CollectionPath from 'co/collections/path'

export default class EditBookmarkPath extends React.Component {
    static defaultProps = {
        _id:        0,
        last:       false,
        collectionId: 0
    }

    onPress = ()=>
        this.props.navigation.navigate('path', { _id: this.props._id, autoCommit: false })

    render() {
        const { item: { collectionId }, last } = this.props

        return (
            <CollectionPath 
                last={last}
                _id={collectionId}
                onPress={this.onPress} />
        )
    }
}