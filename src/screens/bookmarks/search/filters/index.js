import React from 'react'
import t from 't'
import _ from 'lodash'

import SectionList from 'co/list/sections/basic'
import Tag from 'co/tags/item'
import Head from './head'
import Section from './section'
import EmptyState from './empty'

const emptyArray = []
const getDataFromTags = _.memoize((tags = emptyArray)=>{
	return tags.length ? [{
		key: 'section-tags',
		type: 'tags',
		title: t.s('tags'),
		data: tags
	}] : emptyArray
})

export default class Search extends React.PureComponent {
	renderSectionHeader = ({section})=>(
		<Section {...section} />
	)

	onTagTap = (name)=>{
		this.props.onAppend('tag', name)
	}

	renderItem = ({item, section})=>{
		switch (section.type) {
			case 'tags':
				return (
					<Tag 
						{...item}
						onItemTap={this.onTagTap}
						onEditTag={this.props.onEditTag}
						onRemoveTag={this.props.onRemoveTag} />
				)
		}
	}

	ListHeaderComponent = ()=>(
		<Head 
			types={this.props.types}
			important={this.props.important}
			broken={this.props.broken}
			best={this.props.best}
			onAppend={this.props.onAppend}
			onRemove={this.props.onRemove} />
	)

	ListEmptyComponent = ()=>(
		<EmptyState 
			collection={this.props.collection}
			status={this.props.status} />
	)

	keyExtractor = (item)=>item.key||item.name

	render() {
		return (
			<SectionList
				sections={getDataFromTags(this.props.tags)}
				renderItem={this.renderItem}
				renderSectionHeader={this.renderSectionHeader}
				ListHeaderComponent={this.ListHeaderComponent}
				ListEmptyComponent={this.ListEmptyComponent}

				keyExtractor={this.keyExtractor}

				refreshing={false}
				initialNumToRender={15}

				onRefresh={this.props.onRefresh}
				/>
		)
	}
}