import React from 'react'
import { SafeAreaView } from 'react-native'
import Navigation from 'modules/navigation'
import _ from 'lodash-es'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as filtersActions from 'data/actions/filters'
import * as bookmarksActions from 'data/actions/bookmarks'
import * as tagsActions from 'data/actions/tags'
import { makeSearch } from 'data/selectors/bookmarks'
import { makeFilters, makeSuggestedList } from 'data/selectors/filters'
import { makeCollection } from 'data/selectors/collections'

import Field from './field'
import Filters from './filters'
import Current from './current'
import SpaceContainer from 'co/bookmarks/items'
import LoadingView from 'co/common/loadingView'

const viewStyle = {flex:1}

class SearchContainer extends React.PureComponent {
	constructor(props) {
		super(props)
		this._navigationEvents = Navigation.events().bindComponent(this)
	}

	componentDidAppear() {
		if (this.props.filters.status == 'idle')
			this.props.actions.filters.load(this.props.spaceId)
	}

	componentWillUnmount() {
		this._navigationEvents && this._navigationEvents.remove()
	}

	onRefreshFilters = ()=>{
		this.props.actions.filters.load(this.props.spaceId)
	}

	onAppend = (key, val)=>{
		var newSearch = this.props.search.concat([{key, val}])

		this.props.actions.bookmarks.load(this.props.spaceId, {
			search: newSearch
		})
		this.props.actions.filters.load(this.props.spaceId)
	}

	onRemove = (key, val)=>{
		this.props.actions.bookmarks.load(this.props.spaceId, {
			search: _.reject(this.props.search, (s)=>(s.key==key && s.val==val))
		})
		this.props.actions.filters.load(this.props.spaceId)
	}

	onEditTag = (tagName)=>{
		Navigation.showModal(this.props, 'tags/edit', {tagName})
	}

	onRemoveTag = (tagName)=>{
		this.props.actions.tags.oneRemove(tagName)
	}

	render() {
		const {spaceId, search, filters, suggested, collection} = this.props
		var content;

		if (search.length)
			content = [
				(<Current 
					key='current'
					items={search}
					suggested={suggested}
					onAppend={this.onAppend}
					onRemove={this.onRemove} />),

				(<SpaceContainer 
					key='bookmrks'
					spaceId={spaceId}
					hideHead={true}
					componentId={this.props.componentId} />)
			];
		else{
			const filtersLoading = (filters.status=='loading' || filters.status=='idle')
			
			content = (
				<LoadingView loading={filtersLoading}>
					<Filters
						{...filters}
						collection={collection}
						onAppend={this.onAppend}
						onRemove={this.onRemove}
						onRefresh={this.onRefreshFilters}
						onEditTag={this.onEditTag}
						onRemoveTag={this.onRemoveTag} />
				</LoadingView>
			)
		}

		return (
			<SafeAreaView style={viewStyle}>
				<Field 
					{...this.props} />
				{content}
			</SafeAreaView>
		)
	}
}

const makeMapStateToProps = () => {
	const
		getSearch = makeSearch(),
		getFilters = makeFilters(),
		getSuggested = makeSuggestedList(),
		getCollection = makeCollection();

	const mapStateToProps = (state, {spaceId})=>{
		return {
			spaceId,
			search: getSearch(state, spaceId),
			filters: getFilters(state, spaceId),
			suggested: getSuggested(state, spaceId),
			collection: getCollection(state, spaceId)
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: {
			filters: 			bindActionCreators(filtersActions, dispatch),
			bookmarks: 			bindActionCreators(bookmarksActions, dispatch),
			tags: 				bindActionCreators(tagsActions, dispatch),
		}
	})
)(SearchContainer)