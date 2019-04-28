import React from 'react'
import _ from 'lodash-es'
import { formElementHeight } from 'co/style/form'
import { Other } from './style'

export default class TagsFormOther extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {items: props.other}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.other != this.props.other || nextProps.current != this.props.current || nextProps.filter != this.props.filter)
			this.filterItems(nextProps.other, nextProps.current, nextProps.filter)
	}

	keyExtractor = ({name})=>name
	getItemLayout = (data, index)=>({length: formElementHeight, offset: formElementHeight * index, index})

	filterItems = _.throttle((items, current, filter)=>{
		const filtered = items.filter(({name})=>(name.toLowerCase().indexOf(filter)!=-1) && (_.indexOf(current, name)==-1))
		const isEqual = (items.length==filtered.length && items.every((v,i)=> v.name === filtered[i].name))

		if (!isEqual || !filter)
			this.setState({items: filtered})
	}, 500)

	onSelect = (name)=>()=>{
		this.props.onAppendTag(name)
	}

	renderItem = ({item})=>(
		<Other.Item.Tap onPress={this.onSelect(item.name)}>
			<Other.Item.Text>{item.name}</Other.Item.Text>
		</Other.Item.Tap>
	)

	render() {
		if ((!this.props.filter || !this.state.items.length) && !this.props.inputFocus)
			return null

		return (
			<Other.Wrap>
				<Other.List 
					data={this.state.items}
					renderItem={this.renderItem}
					keyExtractor={this.keyExtractor}
					getItemLayout={this.getItemLayout} />
			</Other.Wrap>
		)
	}
}