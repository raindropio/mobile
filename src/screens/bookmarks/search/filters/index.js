import t from 't'
import React from 'react'
import _ from 'lodash'
import Navigation from 'modules/navigation'
import LoadingView from 'co/common/loadingView'
import SimpleSectionList from 'co/list/sections/simple'
import { Icons } from './style'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as filtersActions from 'data/actions/filters'
import { getFilters } from 'data/selectors/filters'

class FiltersList extends React.Component {
	sections = [{
		id: 'types',
		title: _.capitalize(t.s('fastFilter')),
		getItemAttribute: (item, key)=>{
			switch(key){
				case 'title':{
					switch(item.name) {
						case 'important': return t.s('favoriteSites')
						case 'broken': return t.s('broken')
						default: return t.s(item.name+'s')
					}
				}
				case 'iconComponent': {const Component = Icons[item.name]; return Component ? <Component /> : null}
			}
			return null
		}
	}, {
		id: 'tags',
		title: t.s('tags'),
		getItemAttribute: (item, key)=>{
			switch(key){
				case 'title': return item.name
				case 'description': return item.count
				case 'action': return require('assets/images/more.png')
			}
			return null
		}
	}]
	
	_navigationEvents = Navigation.events().bindComponent(this)
	componentWillUnmount() {this._navigationEvents && this._navigationEvents.remove()}

	componentDidAppear() {
		if (this.props.filters.status == 'idle')
			this.props.actions.load(this.props.spaceId)
	}
	
	onItemPress = ({name}, {id})=>{
		let key, value

		switch(id) {
			case 'types':
				switch (name) {
					case 'important':
					case 'broken':
						key = name
						value = 1
					break;
		
					default:
						key = 'type'
						value = name
					break;
				}
			break

			case 'tags':
				key = 'tag'
				value = name
			break
		}

		this.props.onAppend(key, value)
	}

	onActionPress = ({name})=>
		Navigation.showModal(this.props, 'tags/edit', {tagName: name})

	render() {
		return (
			<LoadingView loading={this.props.filters.status=='loading' || this.props.filters.status=='idle'}>
				<SimpleSectionList 
					sections={this.sections}
					onItemPress={this.onItemPress}
					onActionPress={this.onActionPress}
					
					{...this.props.filters} />
			</LoadingView>
		)
	}
}

export default connect(
	(state, {spaceId})=>({
		filters: getFilters(state, spaceId)
	}),
	(dispatch)=>({
		actions: bindActionCreators(filtersActions, dispatch)
	})
)(FiltersList)