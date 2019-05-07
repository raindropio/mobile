import React from 'react'
import { ThemeProvider } from 'styled-components'
import { TouchableOpacity } from 'react-native'

import {
	ItemView,
	ItemTitle,
	ItemCount,
	ItemExpand,
	ItemExpandImage
} from './style'

import TouchItem from 'co/common/touchItem'
import Icon from 'co/common/icon'

const
	expand = require('assets/images/expand.png'),
	collapse = require('assets/images/collapse.png'),
	dot = require('assets/images/dot.png')

export default class CollectionItemView extends React.Component {
	render() {
		const {
			_id,
			title,
			count,
			cover,
			expanded,
			color,
		} = this.props.item
		
		const {
			expandable,
			level,
			selected,
		
			onItemTap,
			onToggle
		} = this.props

		return (
			<ThemeProvider theme={{itemSelected: selected, tintColor: color||this.props.color}}>
				<TouchItem onPress={onItemTap}>
					<ItemView level={level}>
						<Icon collectionId={_id} src={cover} title={title} color={color} />
						<ItemTitle numberOfLines={1}>{title}</ItemTitle>
		
						{count ? <ItemCount>{count}</ItemCount> : null}
						{expandable
							? 
							<TouchableOpacity onPress={onToggle}>
								<ItemExpand><ItemExpandImage source={expanded ? collapse : expand} /></ItemExpand>
							</TouchableOpacity>
							:
							<ItemExpand><ItemExpandImage source={dot} /></ItemExpand>
						}
					</ItemView>
				</TouchItem>
			</ThemeProvider>
		)
	}
}