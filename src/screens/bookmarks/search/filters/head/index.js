import React from 'react'
import t from 't'
import _ from 'lodash-es'

import {
	HeadView,
	HeadItems
} from './style'
import Item from './item'
import {
	SectionView,
	SectionText
} from 'co/style/section'

export default class FiltersHead extends React.PureComponent {
	renderItem = ({item})=>(
		<Item 
			{...item}
			onAppend={this.props.onAppend}
			onRemove={this.props.onRemove} />
	)

	keyExtractor = (item)=>item.key||item.name

	render() {
		var data = []
		if (this.props.important)
			data.push({name: 'important', type: 'important'})

		if (this.props.types)
			data = data.concat(this.props.types.map((t)=>({...t, type: 'type'})))

		if (this.props.broken)
			data.push({name: 'broken', type: 'broken'})

		if (!data.length)
			return null

		return (
			<HeadView>
				<SectionView>
					<SectionText>{_.capitalize(t.s('fastFilter'))}</SectionText>
				</SectionView>

				<HeadItems 
					data={data}
					horizontal={true}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor} />
			</HeadView>
		)
	}
}