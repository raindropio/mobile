import t from 't'
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'

import View from './view'

class URLType extends React.PureComponent {
	resultIsSended = false

    componentDidMount() {
		this.props.actions.bookmarks.draftLoad(this.props.values[0], {
			autoCreate: false
		})
		this.props.actions.bookmarks.onePreload({link: this.props.values[0]})
	}

    render() {
		let message = ''
		
		if (!this.resultIsSended)
			switch(this.props.status){
				case 'new':
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

	const mapStateToProps = (state, {values=[]})=>{
        const { _id } = getDraftItem(state, values[0])
        
		return {
			_id,
			status: getDraftStatus(state, values[0])
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