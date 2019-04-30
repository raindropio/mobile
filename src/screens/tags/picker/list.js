import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'
import SimpleSectionList from 'co/list/sections/simple'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tagsActions from 'data/actions/tags'
import { getTags } from 'data/selectors/tags'

class TagsList extends React.Component {
	sections = [{
		id: 'suggested',
		title: t.s('suggested'),
		item: {
			title: 'name'
		}
	}, {
		id: 'all',
		title: t.s('all'),
		item: {
			title: 'name',
			description: 'count',
			action: require('assets/images/more.png')
		}
	}]
	
	onItemPress = ({name})=>
		this.props.events.onAdd(name)

	onActionPress = ({name})=>
		Navigation.push(this.props, 'tags/edit', {tagName: name})
    
    componentDidMount() {
		this.props.actions.load()
	}

    render() {
        return (
            <SimpleSectionList 
				sections={this.sections}
				onItemPress={this.onItemPress}
				onActionPress={this.onActionPress}
				
                filter={this.props.newTag}
                suggested={this.props.suggested}
                all={this.props.all} />
        )
    }
}

export default connect(
	state => ({
		all: getTags(state)
	}),
	(dispatch)=>({
		actions: bindActionCreators(tagsActions, dispatch)
	})
)(TagsList)