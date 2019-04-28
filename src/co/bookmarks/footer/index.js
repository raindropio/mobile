import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeStatusNextPage, makeBookmarksCount } from 'data/selectors/bookmarks'

import View from './view'

class SpaceFooterContainer extends React.Component {
	onNextPage = ()=>{
		this.props.actions.bookmarks.nextPage(this.props.spaceId)
	}

	render() {
		return View({
			status: this.props.status,
			count: this.props.count,
			onNextPage: this.onNextPage
		})
	}
}

const makeMapStateToProps = () => {
	const
		getStatusNextPage = makeStatusNextPage(),
		getBookmarksCount = makeBookmarksCount()

	const mapStateToProps = (state, {spaceId})=>{
		return {
			status: 		getStatusNextPage(state, spaceId),
			count: 			getBookmarksCount(state, spaceId)
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
			bookmarks: 			bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(SpaceFooterContainer)