import React from 'react'
import t from 't'
import { compactNumber } from 'modules/format/string'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'

import {
	ItemView,
	ItemTitle,
	ItemCount,
	Expand,
	ItemExpandImage
} from './style'

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
			<RectButton onPress={onItemTap}>
				<ItemView level={level} color={color} selected={selected}>
					<Icon collectionId={_id} src={cover[0]} selected={selected} />
					<ItemTitle numberOfLines={1} selected={selected}>
						{_id==-100?t.s('create')+' ':''}{title}
					</ItemTitle>

					{collaborators && <ItemExpandImage source={require('assets/images/collaboratorsStatus.png')} />}

					{count ? (<ItemCount selected={selected}>
						{compactNumber(count)}
					</ItemCount>) : null}

					{expandable
						? 
						<BorderlessButton onPress={onToggle}>
							<Expand>
								<ItemExpandImage selected={selected} source={expanded ? require('assets/images/collapse.png') : require('assets/images/expand.png')} />
							</Expand>
						</BorderlessButton>
						:
						<Expand><ItemExpandImage selected={selected} source={require('assets/images/dot.png')} /></Expand>
					}
				</ItemView>
			</RectButton>
		)
	}
}