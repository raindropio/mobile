import React from 'react'
import { Share } from 'react-native'
import { openURL } from 'modules/browser'
import collectionColor from 'co/collections/utils/color'

import { connect } from 'react-redux'
import * as actions from 'data/actions/bookmarks'
import { makeBookmark, makeHighlight, makeIsSelected, makeSelectModeEnabled } from 'data/selectors/bookmarks'

import View from './view'

class BookmarkItemContainer extends React.Component {
	openBookmark = ()=>{
		openURL({
			link: this.props.item.link,
			iconColor: collectionColor(this.props.item.collectionId)
		})
	}

	onItemTap = ()=>{
		if (this.props.selectModeEnabled)
			this.onSelect()
		else
			this.openBookmark()
	}

	onSelect = ()=>{
		if (this.props.selected)
			this.props.unselectOne(this.props.spaceId, this.props.item._id)
		else
			this.props.selectOne(this.props.spaceId, this.props.item._id)
	}

	onImportant = ()=>{
		this.props.oneImportant(this.props.item._id)
	}

	onRemove = ()=>{
		this.props.oneRemove(this.props.item._id)
	}

	onShare = ()=>{
		Share.share({
			message: this.props.item.link,
			url: this.props.item.link,
		})
	}

	onMove = ()=>{
		this.props.navigation.navigate('bookmark', { screen: 'path', params: { _id: this.props.item._id } })
	}

	onEdit = ()=>{
		this.props.navigation.navigate('bookmark', this.props.item)
	}

	onCollectionPress = ()=>
		this.props.navigation.push('browse', {spaceId: this.props.item.collectionId})

	onActionPress = (name)=>{
		switch(name){
			case 'star': return this.onImportant()
			case 'move': return this.onMove()
			case 'share': return this.onShare()
			case 'remove': return this.onRemove()
		}
	}

	render() {
		return (
			<View
				{...this.props}
				onItemTap={this.onItemTap}
				onSelect={this.onSelect}
				onActionPress={this.onActionPress}
				onEdit={this.onEdit}
				onCollectionPress={this.onCollectionPress}
				/>
		)
	}
}

const makeMapStateToProps = () => {
	const getIsSelected = makeIsSelected()
	const getBookmark = makeBookmark()
	const getHighlight = makeHighlight()
	const getSelectModeEnabled = makeSelectModeEnabled()

	const mapStateToProps = (state, {bookmarkId, spaceId})=>{
		const item = getBookmark(state, bookmarkId)
		const selectModeEnabled = getSelectModeEnabled(state, spaceId)

		return {
			item,
			highlight: getHighlight(state, bookmarkId),
			selected: selectModeEnabled ? getIsSelected(state, spaceId, bookmarkId) : false,
			selectModeEnabled
		};
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	actions
)(BookmarkItemContainer)