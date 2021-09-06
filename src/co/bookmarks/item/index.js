import React from 'react'
import Share from 'react-native-share'
import Browser from 'modules/browser'

import { connect } from 'react-redux'
import * as actions from 'data/actions/bookmarks'
import { bookmark, highlight, makeIsSelected, selectModeEnabled } from 'data/selectors/bookmarks'

import View from './view'

class BookmarkItemContainer extends React.Component {
	state = {
		open: false
	}

	onItemPress = ()=>{
		if (this.props.selectModeEnabled)
			this.onSelect()
		else
			this.setState({ open: true })
	}

	onBrowserClose = ()=>
		this.setState({ open: false })

	onSelect = ()=>{
		if (this.props.selected)
			this.props.unselectOne(this.props.spaceId, this.props.item._id)
		else
			this.props.selectOne(this.props.spaceId, this.props.item._id)
	}

	onImportant = ()=>
		this.props.oneImportant(this.props.item._id)

	onRemove = ()=>
		this.props.oneRemove(this.props.item._id, ()=>{}, error=>this.props.navigation.push('overlay/error', { error }))

	onShare = ()=>
		Share.open({
			title: this.props.item.title,
			url: this.props.item.link,
			failOnCancel: false
		})

	onMove = ()=>
		this.props.navigation.navigate('bookmark', { 
			screen: 'path', 
			params: {
				_id: this.props.item._id
			}
		})

	onEdit = ()=>
		this.props.navigation.navigate('bookmark', { _id: this.props.item._id, spaceId: this.props.spaceId })

	render() {
		return (
			<>
				{this.state.open && (
					<Browser
						link={this.props.item.link}
						mimeType={this.props.item.fileType ? this.props.item.fileType : (this.props.item.type=='document' ? 'auto' : null)}
						onClose={this.onBrowserClose} />
				)}
			
				<View
					{...this.props}
					onItemPress={this.onItemPress}
					onSelect={this.onSelect}
					onImportant={this.onImportant}
					onMove={this.onMove}
					onShare={this.onShare}
					onRemove={this.onRemove}
					onEdit={this.onEdit}
					/>
			</>
		)
	}
}

const makeMapStateToProps = () => {
	const getIsSelected = makeIsSelected()

	const mapStateToProps = (state, {bookmarkId, spaceId})=>{
		const item = bookmark(state, bookmarkId)
		const _selectModeEnabled = selectModeEnabled(state, spaceId)

		return {
			item,
			highlight: highlight(state, spaceId, bookmarkId),
			selected: _selectModeEnabled ? getIsSelected(state, spaceId, bookmarkId) : false,
			selectModeEnabled: _selectModeEnabled
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	actions
)(BookmarkItemContainer)