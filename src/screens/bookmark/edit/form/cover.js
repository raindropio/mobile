import React from 'react'
import Navigation from 'modules/navigation'
import { connect } from 'react-redux'
import { makeCovers } from 'data/selectors/bookmarks'

import { CoverTap } from './cover.style'
import Cover from 'co/common/cover'

class BookmarkEditCover extends React.Component {
    static defaultProps = {
        _id: 0,
        cover: '',
        domain: ''
    }

    onPress = ()=>{
        Navigation.push(this.props, 'bookmark/cover', {
			_id: this.props._id
		})
    }

    render() {
        return (
            <CoverTap onPress={this.onPress}>
                <Cover images={this.props.covers} domain={this.props.domain} size='list' />
            </CoverTap>
        )
    }
}

export default connect(
	() => {
        const getCovers = makeCovers()

        return (state, { cover, domain })=>({
            covers: getCovers(cover, domain)
        })
    },
	undefined
)(BookmarkEditCover)