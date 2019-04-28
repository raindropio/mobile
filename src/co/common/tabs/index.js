import React from 'react'
import {
	TabsView,
	TabItem,
	TabText
} from './style'

export default class Tabs extends React.PureComponent {
	render() {
		const {
			items,
			active,
			onChange
		} = this.props

		return (
			<TabsView>
				{items.map((item)=>(
					<TabItem key={item.key} active={item.key==active} onPress={()=>onChange(item.key)}>
						<TabText active={item.key==active}>{item.title}</TabText>
					</TabItem>
				))}
			</TabsView>
		)
	}
}