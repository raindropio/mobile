import React from 'react'
import { SafeAreaView } from 'react-native'
import Navigation from 'modules/navigation'
import _ from 'lodash-es'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { getSearch } from 'data/selectors/bookmarks'

import Field from './field'
import Filters from './filters'
import SpaceContainer from 'co/bookmarks/items'

const viewStyle = {flex:1}

class SearchContainer extends React.PureComponent {
	onAppend = (key, val)=>{
		var newSearch = this.props.search.concat([{key, val}])

		this.props.actions.bookmarks.load(this.props.spaceId, {
			search: newSearch
		})
	}

	onRemove = (key, val)=>{
		this.props.actions.bookmarks.load(this.props.spaceId, {
			search: _.reject(this.props.search, (s)=>(s.key==key && s.val==val))
		})
	}

	onEditTag = (tagName)=>{
		Navigation.showModal(this.props, 'tags/edit', {tagName})
	}

	render() {
		const { spaceId, search } = this.props
		var content;

		if (search.length)
			content = (
				<SpaceContainer 
					key='bookmrks'
					spaceId={spaceId}
					hideHead={true}
					componentId={this.props.componentId} />
			)
		else{
			content = (
				<Filters
					componentId={this.props.componentId}
					spaceId={this.props.spaceId}
					onAppend={this.onAppend} />
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

export default connect(
	(state, {spaceId})=>({
		search: getSearch(state, spaceId)
	}),
	(dispatch)=>({
		actions: {
			bookmarks: 			bindActionCreators(bookmarksActions, dispatch)
		}
	})
)(SearchContainer)