import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { collection } from 'data/selectors/collections'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'

class SaveURL extends React.PureComponent {
	componentDidMount() {
		this.props.actions.bookmarks.draftLoad(this.props.values[0].link, {
			item: {
				...this.props.values[0],
				collectionId: this.props.collectionId,
			},
			autoCreate: true
		})
	}

	render() {
		const { Screen, ...originalProps } = this.props
		return <Screen {...originalProps} />
	}
}

export default connect(
	() => {
		const getDraftStatus = makeDraftStatus()
		const getDraftItem = makeDraftItem()
	
		return (state, {collectionId, values=[]})=>{
			const item = getDraftItem(state, values[0].link)
	
			return {
				item,
				status: getDraftStatus(state, values[0].link),
				collection: collection(state, collectionId)
			}
		}
	},
	(dispatch)=>({
		actions: {
			bookmarks: bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(SaveURL)