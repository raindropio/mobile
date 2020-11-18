import React from 'react'
import { connect } from 'react-redux'
import { load } from 'data/actions/filters'
import { makeTagsAutocomplete } from 'data/selectors/tags'

import FlatList from 'co/list/flat/basic'
import { getListViewParams } from 'modules/view'
import size from 'modules/appearance/size'
import Tag from 'co/tags/item'
import Section from './section'
import Footer from './footer'

class TagsAll extends React.Component {
	listViewParams = getListViewParams(size.height.item)

    componentDidMount() {
		this.props.load(this.props.spaceId || 'global')
	}

	keyExtractor = ({ _id })=>_id

	footer = ()=> <Footer {...this.props} />

	renderItem = ({ item })=>{
		switch(item.type) {
			case 'section':
				return <Section {...item} />

			default:
				return (
					<Tag 
						{...item}
						selected={this.props.selected.includes(item._id)}
						swipeEnabled={false}
						onItemPress={this.props.onToggle}
						onEdit={this.props.onEdit} />
				)
		}
	}

    render() {
		const { tags } = this.props

        return (
			<FlatList 
				{...this.listViewParams}
				data={tags}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem}
				ListFooterComponent={this.footer} />
        )
    }
}

export default connect(
    () => {
        const getTagsAutocomplete = makeTagsAutocomplete()
    
        return (state, { spaceId='global', value }) => ({
            tags: getTagsAutocomplete(state, spaceId, value),
        })
    },
	{ load }
)(TagsAll)