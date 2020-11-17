import React from 'react'
import FlatList from 'co/list/flat/basic'
import { getListViewParams } from 'modules/view'
import size from 'modules/appearance/size'

import Tag from 'co/tags/item'
import Section from './section'
import Footer from './footer'

class TagsSelected extends React.Component {
	listViewParams = getListViewParams(size.height.item)
	keyExtractor = (_id)=>_id

	header = ()=> <Section {...this.props} />
	footer = ()=> <Footer {...this.props} />

	renderItem = ({ item: _id })=>(
		<Tag 
			_id={_id}
			selected
			onItemPress={this.props.onToggle}
			onEdit={this.props.onEdit} />
	)

    render() {
		const { selected } = this.props

        return (
			<FlatList 
				{...this.listViewParams}
				data={selected}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem}
				ListHeaderComponent={this.header}
				ListFooterComponent={this.footer} />
        )
    }
}

export default TagsSelected