import React from 'react'
import Icon from 'co/icon'
import getFavicon from 'data/modules/format/favicon'
import {
	ListCover,
	ListInfo,
	ListMoreButton,
	SimpleView,
	moreIcon,

	SimpleSelectButton,
	constants
} from './style'

import ItemInfo from './info'

import Cover from 'co/bookmarks/item/view/cover'

export default (props)=>(
	<SimpleView selected={props.selected}>
		<ListCover>
			<Cover
				src={getFavicon(props.item.domain)}
				domain={props.item.domain}
				width={constants.simple.coverSize}
				height={constants.simple.coverSize} />
		</ListCover>
		<ListInfo>{ItemInfo(props)}</ListInfo>

		{props.selectModeEnabled ? 
			<SimpleSelectButton><Icon name={props.selected ? 'checkbox' : 'checkbox-blank'} variant={props.selected ? 'fill' : 'line'} color={props.selected ? 'accent' : undefined} /></SimpleSelectButton> : 
			(props.showActions && <ListMoreButton onPress={props.onEdit}>{moreIcon}</ListMoreButton>)
		}
	</SimpleView>
)