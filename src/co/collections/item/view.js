import React from 'react'
import { ThemeProvider } from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { compactNumber } from 'modules/format/string'

import {
	ItemView,
	ItemTitle,
	ItemCount,
	ItemExpand,
	ItemExpandImage
} from './style'

import TouchItem from 'co/common/touchItem'
import Icon from 'co/common/icon'

export default class CollectionItemView extends React.Component {
	render() {
		const {
			_id,
			title,
			count,
			cover=[],
			expanded,
			color,
			collaborators
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
						<Icon collectionId={_id} src={cover[0]} title={title} color={color} />
						<ItemTitle numberOfLines={1}>{title}</ItemTitle>

						{collaborators && <ItemExpandImage source={require('assets/images/collaboratorsStatus.png')} />}
						<ItemCount>{compactNumber(count) || ''}</ItemCount>
						{expandable
							? 
							<TouchableOpacity onPress={onToggle}>
								<ItemExpand><ItemExpandImage source={expanded ? require('assets/images/collapse.png') : require('assets/images/expand.png')} /></ItemExpand>
							</TouchableOpacity>
							:
							<ItemExpand><ItemExpandImage source={require('assets/images/dot.png')} /></ItemExpand>
						}
					</ItemView>
				</TouchItem>
			</ThemeProvider>
		)
	}
}