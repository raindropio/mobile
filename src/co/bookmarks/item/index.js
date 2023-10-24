import { Component } from 'react'
import { Alert } from 'react-native'

import { connect } from 'react-redux'
import * as actions from 'data/actions/bookmarks'
import { bookmark, makeIsSelected, selectModeEnabled, makeHighlights } from 'data/selectors/bookmarks'
import * as browser from 'screens/browser'

import View from './view'
import share from './share'

class BookmarkItemContainer extends Component {
	onItemPress = ()=>{
		if (this.props.selectModeEnabled)
			this.onSelect()
		else
			browser.auto({ navigation: this.props.navigation, bookmark: this.props.item })
	}

	onSelect = ()=>{
		if (this.props.selected)
			this.props.unselectOne(this.props.spaceId, this.props.item._id)
		else
			this.props.selectOne(this.props.spaceId, this.props.item._id)
	}

	onImportant = ()=>
		this.props.oneImportant(this.props.item._id)

	onRemove = ()=>
		this.props.oneRemove(this.props.item._id, ()=>{}, error=>Alert.alert(t.s('error'), error?.message))

	onShare = ()=>
		share(this.props.item)

	onMove = ()=>
		this.props.navigation.navigate('bookmark/path', { _id: this.props.item._id })

	onEdit = ()=>
		this.props.navigation.navigate('bookmark/edit', { _id: this.props.item._id, spaceId: this.props.spaceId })

	render() {
		return (
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
		)
	}
}

const makeMapStateToProps = () => {
	const getIsSelected = makeIsSelected()
	const getHighlights = makeHighlights()

	const mapStateToProps = (state, {bookmarkId, spaceId})=>{
		const item = bookmark(state, bookmarkId)
		const _selectModeEnabled = selectModeEnabled(state, spaceId)

		return {
			item,
			highlights: getHighlights(state, bookmarkId, 3),
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