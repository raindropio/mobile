import React from 'react'
import {View} from 'react-native'

import {CurrentItems} from './style'
import Item from './item'
import Suggested from './suggested'
import Separator from 'co/style/separator'

export default class FiltersHead extends React.PureComponent {
	renderItem = ({item})=>{
		var Component;

		switch(item.type){
			case 'suggested':
				Component = Suggested
			break;

			default:
				Component = Item
			break;
		}

		return (
			<Component 
				{...item}
				_key={item.key}
				onAppend={this.props.onAppend}
				onRemove={this.props.onRemove}
				onSearchAll={this.props.onSearchAll} />
		)
	}

	keyExtractor = (item)=>item.key+'_'+item.val+(item.suggested?'_sug':'')

	render() {
		var data = this.props.items.filter(({key})=>key!='word')
		data = data.concat(this.props.suggested)

		if (!data.length) return null;

		return (
			<View>
				<CurrentItems 
					data={data}
					horizontal={true}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor} />
				<Separator />
			</View>
		)
	}
}