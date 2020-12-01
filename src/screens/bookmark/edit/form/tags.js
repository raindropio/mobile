import t from 't'
import React from 'react'
import { Image } from 'react-native'

import Goto from 'co/goto'

export default class BookmarkEditTagsField extends React.PureComponent {
    static defaultProps = {
        last:       false,
        tags:       [],
        onChange:   null
    }

    onPress = ()=>
        this.props.navigation.navigate('tags', { _id: this.props._id })

    render() {
        const { last, tags } = this.props
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