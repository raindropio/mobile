import React from 'react'
import getFavicon from 'data/modules/format/favicon'
import {
	ListCover,
	ListInfo,
	ListMoreButton,
	SimpleView,
	moreIcon,

	SelectIcon,
	SimpleSelectButton,
	constants
} from './style'

import ItemInfo from './info'

import Cover from 'co/common/cover'

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
			<SimpleSelectButton><SelectIcon selected={props.selected} /></SimpleSelectButton> : 
			(props.showActions && <ListMoreButton onPress={props.onEdit}>{moreIcon}</ListMoreButton>)
		}
	</SimpleView>
)