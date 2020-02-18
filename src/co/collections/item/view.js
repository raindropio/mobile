import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { compactNumber } from 'modules/format/string'

import {
	ItemView,
	ItemTitle,
	ItemCount,
	styles,
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
			<TouchItem onPress={onItemTap}>
				<ItemView level={level} color={color} selected={selected}>
					<Icon collectionId={_id} src={cover[0]} selected={selected} />
					<ItemTitle numberOfLines={1} selected={selected}>{title}</ItemTitle>

					{collaborators && <ItemExpandImage source={require('assets/images/collaboratorsStatus.png')} />}

					{count ? (<ItemCount selected={selected}>
						{compactNumber(count)}
					</ItemCount>) : null}

					{expandable
						? 
						<TouchableWithoutFeedback onPress={onToggle}>
							<View style={styles.expand}>
								<ItemExpandImage selected={selected} source={expanded ? require('assets/images/collapse.png') : require('assets/images/expand.png')} />
							</View>
						</TouchableWithoutFeedback>
						:
						<View style={styles.expand}><ItemExpandImage selected={selected} source={require('assets/images/dot.png')} /></View>
					}
				</ItemView>
			</TouchItem>
		)
	}
}