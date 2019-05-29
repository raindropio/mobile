import t from 't'
import React from 'react'
import _ from 'lodash'
import { Share } from 'react-native'
import Navigation from 'modules/navigation'
import { themed } from 'co/style/colors'
import collectionColor from 'co/collections/utils/color'

import { connect } from 'react-redux'
import * as actions from 'data/actions/bookmarks'
import { bookmark, makeIsSelected, selectModeEnabled, makeCovers } from 'data/selectors/bookmarks'

import View from './view'

class BookmarkItemContainer extends React.Component {
	openBookmark = (options={})=>{
		Navigation.openURL({
			componentId: this.props.componentId,
			...options
		}, {
			browser: options.reactTag ? 'default' : '',
			link: this.props.item.link,
			readerMode: this.props.item.type=='article',
			iconColor: themed._tintColor(collectionColor(this.props.item.collectionId))
		})
	}

	onItemTap = ()=>{
		if (this.props.selectModeEnabled)
			this.onSelect()
		else
			this.openBookmark()
	}

	onItemTapIn = (options={})=>{
		this.openBookmark({reactTag: options.reactTag})
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

	onCollectionPress = ()=>{
		Navigation.push(this.props, 'bookmarks/browse', {spaceId: this.props.item.collectionId})
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
				onItemTapIn={this.onItemTapIn}
				onSelect={this.onSelect}
				onActionPress={this.onActionPress}
				onEdit={this.onEdit}
				onCollectionPress={this.onCollectionPress}
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