import React from 'react'

import {
	ListCover,
	ListView,
	ListInfo,
	ListMoreButton,
	moreIcon,

	SelectIcon,
	ListSelectButton,
	constants
} from './style'

import ItemInfo from './info'
import Cover from 'co/common/cover'

export default (props)=>(
	<ListView selected={props.selected}>
		<ListCover>
			<Cover 
				src={props.item.cover}
				link={props.item.link}
				domain={props.item.domain}
				width={constants.list.coverWidth}
				height={constants.list.coverHeight} />
		</ListCover>
		<ListInfo><ItemInfo {...props} /></ListInfo>

		{props.selectModeEnabled ? 
			<ListSelectButton><SelectIcon selected={props.selected} /></ListSelectButton> : 
			(props.showActions && <ListMoreButton onPress={props.onEdit}>{moreIcon}</ListMoreButton>)
		}
	</ListView>
)