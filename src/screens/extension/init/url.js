import t from 't'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'

import View from './view'

class URLType extends React.PureComponent {
	resultIsSended = false

    constructor(props) {
		super(props)

		props.actions.bookmarks.draftEnsure(props.value, {}, {save: false})
		props.actions.bookmarks.onePreload({link: props.value})
	}

    render() {
        let message = ''

		if (!this.resultIsSended)
			switch(this.props.status){
				case 'notFound':
					this.resultIsSended = true
					this.props.onNew()
					break;

				case 'removed':
				case 'loaded':
					this.resultIsSended = true
					this.props.onEdit(this.props._id)
					break;

				case 'error':
					message = t.s('server')
					break;
			}
        
        return (
            <View
				{...this.props}
				message={message} />
        )
    }
}

const makeMapStateToProps = () => {
	const 
		getDraftStatus = makeDraftStatus(),
		getDraftItem = makeDraftItem()

	const mapStateToProps = (state, {value})=>{
        const { _id } = getDraftItem(state, {link: value})
        
		return {
			_id,
			status: getDraftStatus(state, {link: value})
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
			bookmarks: bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(URLType)