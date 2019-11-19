import React from 'react'
import Navigation from 'modules/navigation'
import { connect } from 'react-redux'

import { CoverWrap, CoverTap } from './cover.style'
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
            <CoverWrap><CoverTap onPress={this.onPress}>
                <CoverWrap>
                    <Cover
                        src={this.props.cover}
                        domain={this.props.domain}
                        width={92}
                        height={70}
                        preloader={true} />
                </CoverWrap>
            </CoverTap></CoverWrap>
        )
    }
}

export default connect(
	undefined,
	undefined
)(BookmarkEditCover)