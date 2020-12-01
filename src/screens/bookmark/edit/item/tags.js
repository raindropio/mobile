import t from 't'
import React from 'react'
import Goto from 'co/goto'

export default class BookmarkEditTagsField extends React.Component {
    onPress = ()=>
        this.props.navigation.navigate('tags', { _id: this.props.item._id })

    render() {
        const { last, item: { tags=[] } } = this.props
        const tagsString = tags.join(', ')

        return (
            <Goto 
                last={last}
                icon='hashtag'
                color='tag'
                onPress={this.onPress}
                label={tagsString || t.s('noTags')} />
        )
    }
}