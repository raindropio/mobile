import React from 'react'
import t from 't'
import { compact } from 'modules/format/number'
import { GotoTap } from 'co/goto/style'
import Icon from 'co/icon'

import {
	ItemView,
	ItemTitle,
	ItemCount,
	Action
} from './style'

import CollectionIcon from 'co/collections/item/icon'

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
		
			onItemPress,
			onToggle
		} = this.props

		return (
			<GotoTap onPress={onItemPress}>
				<ItemView level={level} color={color} selected={selected}>
					<CollectionIcon 
						collectionId={_id} 
						src={cover[0]} 
						selected={selected}
						color={selected ? 'white' : undefined} />

					<ItemTitle numberOfLines={1} selected={selected}>
						{_id==-100?t.s('create')+' ':''}{title}
					</ItemTitle>

					{collaborators && (
						<Icon 
							name='group-2'
							variant='fill'
							size='18' />
					)}

					{count ? (<ItemCount selected={selected}>
						{compact(count)}
					</ItemCount>) : null}

					{expandable
						? 
						<Action 
							onPress={onToggle}>
							<Icon 
								name={expanded ? 'arrow-up-s' : 'arrow-down-s'}
								color={selected ? 'background.regular' : 'text.secondary'} />
						</Action>
						:
						<Action enabled={false}>
							<Icon 
								name='arrow-drop-right'
								color='border'
								variant='fill' />
						</Action>
					}
				</ItemView>
			</GotoTap>
		)
	}
}