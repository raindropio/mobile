import React from 'react'
import Navigation from 'modules/navigation'
import { Keyboard } from 'react-native'
import _ from 'lodash-es'
import fadeIn from 'co/screen/animations/fadeIn'
import t from 't'
import color from 'co/collections/utils/color'
import { connect } from 'react-redux'
import { getSearch } from 'data/selectors/bookmarks'

import { Wrap, Body } from './style'
import Field from './field'
import Filters from './filters'
import SpaceContainer from 'co/bookmarks/items'

class SearchContainer extends React.Component {
	static options = ({spaceId=0})=>({
		tintColor: color(parseInt(spaceId)),

		topBar: {
			animate: false,
			visible: false,
			drawBehind: true
		},

		bottomTabs: {
			visible: parseInt(spaceId)==0
		},

		bottomTab: {
			icon: require('assets/images/tab/search.png'),
			text: t.s('defaultCollection-0')
		},
		
		animations: {
			push: {
				content: fadeIn
			}
		}
	})

	state = {
		fieldValue: '',
		fieldFocus: false
	}

	events = {
		onAppend: (key, val='')=>{
			this.events.hideKeyboard()
			this.setState({fieldValue: ''})
			
			let newSearch = [...this.props.search]
	
			if (key == 'word')
				newSearch = newSearch.filter(({key})=>key!='word')
				
			newSearch.push({key, val})
	
			this.props.loadBookmarks(this.props.spaceId, {
				search: newSearch
			})
			this.props.loadFilters(this.props.spaceId)
		},
	
		onRemove: (key, val)=>{
			this.props.loadBookmarks(this.props.spaceId, {
				search: _.reject(this.props.search, (s)=>(s.key==key && s.val==val))
			})
			this.props.loadFilters(this.props.spaceId)
		},
	
		onCancel: ()=>{
			if (parseInt(this.props.spaceId) != 0)
				Navigation.close(this.props)
	
			this.props.loadBookmarks(this.props.spaceId)
			this.props.loadFilters(this.props.spaceId)
		},
	
		onFieldValueChange: (fieldValue)=>{
			this.setState({fieldValue})
		},

		onFieldFocus: ()=>{
			this.setState({fieldFocus: true})
		},

		onFieldBlur: ()=>{
			this.setState({fieldFocus: false})
		},

		hideKeyboard: ()=>{
			Keyboard.dismiss()
		}
	}

	render() {
		const { spaceId, search } = this.props
		var content;

		if (search.length)
			content = (
				<SpaceContainer 
					key='bookmrks'
					spaceId={spaceId}
					componentId={this.props.componentId} />
			)

		return (
			<Wrap>
				<Field 
					spaceId={this.props.spaceId}
					search={this.props.search}
					value={this.state.fieldValue}
					events={this.events} />
				
				<Body>
					{(!search.length || this.state.fieldFocus) && (
						<Filters
							floating={search.length>0 && this.state.fieldFocus}
							componentId={this.props.componentId}
							spaceId={this.props.spaceId}
							filter={this.state.fieldValue}
							search={this.props.search}
							events={this.events} />
					)}

					{content}
				</Body>
			</Wrap>
		)
	}
}

export default connect(
	(state, {spaceId})=>({
		search: getSearch(state, spaceId)
	}),
	{
		loadBookmarks: require('data/actions/bookmarks').load,
		loadFilters: require('data/actions/filters').load
	}
)(SearchContainer)