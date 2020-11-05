import React from 'react'
import PropTypes from 'prop-types'
import { Keyboard, Platform } from 'react-native'
import _ from 'lodash-es'
import { connect } from 'react-redux'
import { getSearch } from 'data/selectors/bookmarks'
import { mediumFade } from 'co/style/animation'

import { Title } from 'co/navigation/header'
import { Fade } from 'co/navigation/transition'
import { Wrap, Body } from './style'
import Field from './field'
import Filters from './filters'
import SpaceContainer from 'co/bookmarks/items'

class SearchContainer extends React.Component {
	static propTypes = {
		route:  PropTypes.shape({
            params: PropTypes.shape({
				spaceId: PropTypes.number
			})
		})
	}

	static options = {
		...Fade,
		headerTitleAlign: 'left',
		...(Platform.OS=='ios' ? {
			headerLeft: null,
			headerTitleContainerStyle: {
				marginRight: 64
			}
		} : {})
	}

	state = {
		fieldValue: '',
		fieldFocus: false
	}

	events = {
		onAppend: (key, val='')=>{
			this.events.hideKeyboard()
			this.setState({fieldValue: ''})
			
			if (!val) return

			let newSearch = [...this.props.search]
	
			if (key == 'word')
				newSearch = newSearch.filter(({key})=>key!='word')
				
			newSearch.push({key, val})
	
			this.props.loadBookmarks(this.props.route.params.spaceId, {
				search: newSearch,
				sort: this.props.default_sort
			})
			this.props.loadFilters(this.props.route.params.spaceId)
		},
	
		onRemove: (key, val)=>{
			this.props.loadBookmarks(this.props.route.params.spaceId, {
				search: _.reject(this.props.search, (s)=>(s.key==key && s.val==val)),
				sort: this.props.default_sort
			})
			this.props.loadFilters(this.props.route.params.spaceId)
		},
	
		onCancel: ()=>{
			if (!this.props.isRoot)
				this.props.navigation.goBack()
	
			this.props.loadBookmarks(this.props.route.params.spaceId)
			this.props.loadFilters(this.props.route.params.spaceId)
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

	componentDidUpdate(prevProps) {
		if (this.props.search != prevProps.search)
			mediumFade()
	}

	render() {
		const { spaceId, search } = this.props
		var content;

		if (search.length)
			content = (
				<SpaceContainer 
					key='bookmrks'
					spaceId={spaceId} />
			)

		return (
			<Wrap>
				<Title>
					<Field 
						spaceId={this.props.route.params.spaceId}
						isRoot={this.props.isRoot}
						search={this.props.search}
						value={this.state.fieldValue}
						events={this.events} />
				</Title>
				
				<Body>
					{content}

					{(!search.length || this.state.fieldFocus) && (
						<Filters
							floating={search.length>0 && this.state.fieldFocus}
							navigation={this.props.navigation}
							spaceId={this.props.route.params.spaceId}
							filter={this.state.fieldValue}
							search={this.props.search}
							events={this.events} />
					)}
				</Body>
			</Wrap>
		)
	}
}

export default connect(
	(state, { route: { params={} } })=>({
		search: getSearch(state, params.spaceId),
		default_sort: 'score'//state.config.raindrops_sort
	}),
	{
		loadBookmarks: require('data/actions/bookmarks').load,
		loadFilters: require('data/actions/filters').load
	}
)(SearchContainer)