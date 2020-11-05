import t from 't'
import React from 'react'
import { Alert } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeSelectMode, makeBookmarksCount } from 'data/selectors/bookmarks'

import View from './view'

class SpaceToolbarContainer extends React.Component {
	onSelectAll = ()=>{
		if (this.props.ids.length != this.props.count)
			this.props.actions.bookmarks.selectAll(this.props.spaceId)
		else
			this.props.actions.bookmarks.unselectAll(this.props.spaceId)
	}

	onCancel = ()=>{
		this.props.actions.bookmarks.cancelSelectMode(this.props.spaceId)
	}

	onImportant = ()=>{
		this.props.actions.bookmarks.importantSelected(this.props.spaceId)
	}

	onScreenshot = ()=>{
		this.props.actions.bookmarks.screenshotSelected(this.props.spaceId)
	}

	onMove = ()=>{
		this.props.navigation.navigate('bookmarks', {
			screen: 'move', 
			params: {
				spaceId: this.props.spaceId
			}
		})
	}

	onTags = ()=>{
		this.props.navigation.navigate('bookmarks', {
			screen: 'tag',
			params: {
				spaceId: this.props.spaceId
			}
		})
	}

	onRemove = ()=>{
		Alert.alert(t.s('remove') + ' ' + this.props.ids.length + ' ' + t.s('bookmarks')+'?', '',[
			{text: t.s('remove'), onPress:()=>this.props.actions.bookmarks.removeSelected(this.props.spaceId)},
			{text: t.s('cancel'), style: 'cancel'}
		])
	}

	componentWillUnmount() {
		if (this.props.enabled){
			this.onCancel()
		}
	}

	render() {
		if (!this.props.enabled) return null;

		return (
			<View 
				ids={this.props.ids}
				count={this.props.count}

				onImportant={this.onImportant}
				onScreenshot={this.onScreenshot}
				onMove={this.onMove}
				onTags={this.onTags}
				onRemove={this.onRemove}

				onSelectAll={this.onSelectAll}
				onCancel={this.onCancel} />
		)
	}
}

const makeMapStateToProps = () => {
	const
		getSelectMode = makeSelectMode(),
		getBookmarksCount = makeBookmarksCount()

	const mapStateToProps = (state, {spaceId})=>{
		const selectMode = getSelectMode(state, spaceId)

		return {
			enabled: 		selectMode.enabled,
			ids: 			selectMode.ids,
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
)(SpaceToolbarContainer)