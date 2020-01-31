import t from 't'
import _ from 'lodash-es'
import React from 'react'
import { Platform, Alert } from 'react-native'
import Navigation from 'modules/navigation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeSelectMode, makeBookmarksCount } from 'data/selectors/bookmarks'

import View from './view'

var tabBarEnabled;

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
		Navigation.showModal(
			this.props, 
			'collections/picker', 
			{
				title: _.capitalize(t.s('move')) + ' ' + this.props.ids.length + ' ' + t.s('elements2'),
				onSelect: (to)=>{
					this.props.actions.bookmarks.moveSelected(this.props.spaceId, to)
				}
			}
		)
	}

	onTags = ()=>{
		Navigation.showModal(
			this.props,
			'tags/picker',
			{
				title: t.s('addTags'),
				onSubmit: (tags)=>{
					this.props.actions.bookmarks.appendTagsSelected(this.props.spaceId, tags)
				}
			}
		)
	}

	onRemove = ()=>{
		Alert.alert(t.s('remove') + ' ' + this.props.ids.length + ' ' + t.s('elements2')+'?', '',[
			{text: t.s('remove'), onPress:()=>this.props.actions.bookmarks.removeSelected(this.props.spaceId)},
			{text: t.s('cancel'), style: 'cancel'}
		])
	}

	componentDidMount() {
		if (tabBarEnabled == undefined)
			tabBarEnabled = true;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.enabled != this.props.enabled)
			this.toggleTabs(this.props.enabled)
	}

	componentWillUnmount() {
		if (this.props.enabled){
			this.onCancel()
			this.toggleTabs(false)
		}
	}

	toggleTabs = (enabled)=>{
		if (Platform.OS == 'android')
			Navigation.mergeOptions(this.props, {
				bottomTabs: {
					visible: !enabled,
					...Platform.select({
						android: {
							drawBehind: enabled
						}
					})
				}
			})
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