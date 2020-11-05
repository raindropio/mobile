import t from 't'
import React from 'react'
import SimpleSectionList from 'co/list/sections/simple'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tagsActions from 'data/actions/tags'
import { makeFilteredTags } from 'data/selectors/tags'

class TagsList extends React.Component {
	sections = [{
		id: 'suggested',
		title: t.s('suggested'),
		getItemAttribute: (item, key)=>{
			switch(key){
				case 'title': return item.name
			}
			return null
		}
	}, {
		id: 'all',
		title: t.s('all'),
		getItemAttribute: (item, key)=>{
			switch(key){
				case 'title': return item.name
				case 'description': return item.count
				case 'action': return require('assets/images/more.png')
			}
			return null
		}
	}]
	
	onItemPress = ({name})=>
		this.props.events.onAdd(name)

	onActionPress = ({name})=>
		this.props.navigation.navigate('edit', {tagName: name})
    
    componentDidMount() {
		this.props.actions.load()
	}

    render() {
        return (
            <SimpleSectionList 
				sections={this.sections}
				onItemPress={this.onItemPress}
				onActionPress={this.onActionPress}
				keyboardDismissMode='on-drag'
				
                filter={this.props.value}
                suggested={this.props.suggested}
                all={this.props.all} />
        )
    }
}

export default connect(
	() => {
		const getFilteredTags = makeFilteredTags()

		return (state, {selected})=>({
			all: getFilteredTags(state, selected)
		})
	},
	(dispatch)=>({
		actions: bindActionCreators(tagsActions, dispatch)
	})
)(TagsList)