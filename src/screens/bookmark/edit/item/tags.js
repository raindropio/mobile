import t from 't'
import { Component } from 'react';
import Goto from 'co/goto'

export default class BookmarkEditTagsField extends Component {
    onPress = ()=>
        this.props.navigation.navigate('tags', { _id: this.props._id, autoCommit: false })

    render() {
        const { last, item: { tags=[] } } = this.props
        const tagsString = tags.join(', ')

        return (
            <Goto 
                last={last}
                icon='hashtag'
                onPress={this.onPress}
                label={tagsString || t.s('tags')}
                subLabel={tags.length ? tags.length : ''}
                subLabelBadge={tags.length ? true : false} />
        )
    }
}