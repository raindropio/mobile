import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'modules/navigation'
import t from 't'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as filtersActions from 'data/actions/filters'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeCollection } from 'data/selectors/collections'
import { makeSearch, makeSearchWord } from 'data/selectors/bookmarks'

import SearchBar from 'co/common/searchBar'

class SearchFieldContainer extends React.PureComponent {
	static propTypes = {
		spaceId:	PropTypes.string
	}

	onCancel = ()=>{
		if (this.props.collection._id != 0)
			Navigation.close(this.props)

		this.props.actions.bookmarks.load(this.props.spaceId)
		this.props.actions.filters.load(this.props.spaceId)
	}

	onSubmit = (text)=>{
		const newWord = (text||'').trim()

		var oldWord = (this.props.search.find((item)=>item.key=='word'))||{val:''}
		var newSearch = this.props.search.filter((item)=>item.key!='word')

		if (newWord)
			newSearch = newSearch.concat([{key: 'word', val: newWord}])

		if (newWord != oldWord.val){
			this.props.actions.bookmarks.load(this.props.spaceId, {
				search: newSearch
			})
			this.props.actions.filters.load(this.props.spaceId)
		}
	}

	render() {
		const notRoot = this.props.collection._id != 0
		var placeholder = t.s('defaultCollection-0')
		if (notRoot)
			placeholder += ' ' + t.s('in') + ' ' + this.props.collection.title

		return (
			<SearchBar
				showCancel={this.props.search.length > 0 || notRoot}
				placeholder={placeholder}
				autoFocus={notRoot}
				onSubmit={this.onSubmit}
				onCancel={this.onCancel} />
		)
	}
}

const makeMapStateToProps = () => {
	const
		getSearch = makeSearch(),
		getSearchWord = makeSearchWord(),
		getCollection = makeCollection()

	const mapStateToProps = (state, {spaceId})=>{
		return {
			spaceId,
			search: getSearch(state, spaceId),
			word: getSearchWord(state, spaceId),
			collection: getCollection(state, spaceId),
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
			filters: 			bindActionCreators(filtersActions, dispatch),
			bookmarks: 			bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(SearchFieldContainer)