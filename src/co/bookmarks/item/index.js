import t from 't'
import React from 'react'
import _ from 'lodash'
import { Share } from 'react-native'
import Navigation from 'modules/navigation'

import { connect } from 'react-redux'
import * as actions from 'data/actions/bookmarks'
import { bookmark, makeIsSelected, selectModeEnabled, makeCovers } from 'data/selectors/bookmarks'

import View from './view'
import openBookmark from 'co/bookmarks/actions/open'

class BookmarkItemContainer extends React.Component {
	onItemTap = (options={})=>{
		if (this.props.selectModeEnabled)
			this.onSelect()
		else
			openBookmark({
				componentId: this.props.componentId,
				reactTag: options.reactTag
			}, this.props.item)
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
		Navigation.showModal(this.props, 'collections/picker', {
			title: `${_.capitalize(t.s('move'))} "${this.props.item.title}"`,
			selectedId: this.props.item.collectionId,
			onSelect: (collectionId)=>{
				this.props.oneMove(this.props.item._id, collectionId)
			}
		})
	}

	onEdit = ()=>{
		Navigation.showModal(this.props, 'bookmark/edit', this.props.item)
	}

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
				/>
		)
	}
}

const makeMapStateToProps = () => {
	const
		getCovers = makeCovers(),
		getIsSelected = makeIsSelected()

	const mapStateToProps = (state, {bookmarkId, spaceId})=>{
		const item = bookmark(state, bookmarkId)

		return {
			item,
			covers: getCovers(item.cover, item.domain),
			selected: selectModeEnabled ? getIsSelected(state, spaceId, bookmarkId) : false,
			selectModeEnabled: selectModeEnabled(state, spaceId)
		};
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	actions
)(BookmarkItemContainer)