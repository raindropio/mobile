import React from 'react'
import { Tap } from './cover.style'
import Cover from 'co/bookmarks/item/view/cover'
import { constants } from 'co/bookmarks/item/view/style'

class BookmarkEditCover extends React.Component {
    static defaultProps = {
        _id: 0,
        cover: '',
        domain: '',
        link: ''
    }

    onPress = ()=>
        this.props.navigation.navigate('cover', { _id: this.props._id })

    render() {
        return (
            <Tap onPress={this.onPress}>
                    <Cover
                        src={this.props.cover}
                        link={this.props.link}
                        domain={this.props.domain}
                        width={constants.list.coverWidth}
				        height={constants.list.coverHeight}
                        preloader={true} />
            </Tap>
        )
    }
}

export default BookmarkEditCover