import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import * as collectionsActions from 'data/actions/collections'
import { collection } from 'data/selectors/collections'
import { makeDraftItem, makeDraftStatus } from 'data/selectors/bookmarks'

import View from './view'

class ExtensionSaveURL extends React.PureComponent {
	componentDidMount() {
		this.props.actions.collections.oneLoadColor(this.props.collectionId)
		this.props.actions.bookmarks.draftEnsure(this.props.value, {collectionId: this.props.collectionId})
	}

	onEdit = ()=>{
		this.props.onEdit(this.props.item._id)
	}

	onAddTags = ()=>{
		this.props.onAddTags(this.props.item._id)
	}

	onToggleImportant = ()=>{
		this.props.actions.bookmarks.oneImportant(this.props.item._id)
	}

	render() {
		return (
			<View
				{...this.props}
				onEdit={this.onEdit}
				onAddTags={this.onAddTags}
				onToggleImportant={this.onToggleImportant} />
		)
	}
}

const makeMapStateToProps = () => {
	const 
		getDraftStatus = makeDraftStatus(),
		getDraftItem = makeDraftItem()

	const mapStateToProps = (state, {collectionId, value})=>{
		const item = getDraftItem(state, {link: value})

		return {
			item,
			status: getDraftStatus(state, {link: value}),
			collection: collection(state, item.collectionId || collectionId)
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
			bookmarks: bindActionCreators(bookmarksActions, dispatch),
			collections: bindActionCreators(collectionsActions, dispatch)
		}
	})
)(ExtensionSaveURL)