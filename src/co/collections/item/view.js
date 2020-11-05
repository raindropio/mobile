import React from 'react'
import t from 't'
import { compactNumber } from 'modules/format/string'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'co/icon'

import {
	ItemView,
	ItemTitle,
	ItemCount,
	Action
} from './style'

import CollectionIcon from 'co/common/icon'

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
					<CollectionIcon collectionId={_id} src={cover[0]} selected={selected} />
					<ItemTitle numberOfLines={1} selected={selected}>
						{_id==-100?t.s('create')+' ':''}{title}
					</ItemTitle>

					{collaborators && (
						<Icon 
							name='account-circle'
							variant='fill'
							size='16' />
					)}

					{count ? (<ItemCount selected={selected}>
						{compactNumber(count)}
					</ItemCount>) : null}

					{expandable
						? 
						<Action onPress={onToggle}>
							<Icon 
								name={expanded ? 'arrow-up-s' : 'arrow-down-s'}
								color={selected ? 'background.regular' : 'text.secondary'} />
						</Action>
						:
						<Action>
							<Icon 
								name='arrow-drop-right'
								color='border' />
						</Action>
					}
				</ItemView>
			</RectButton>
		)
	}
}