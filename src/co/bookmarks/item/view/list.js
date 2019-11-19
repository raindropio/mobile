import React from 'react'

import {
	ListView,
	ListInfo,
	ListMoreButton,
	ListCover,
	moreIcon,

	SelectIcon,
	ListSelectButton,
	constants
} from './style'

import ItemInfo from './info'
import Cover from 'co/common/cover'

export default (props)=>(
	<ListView tall={props.showCollectionPath} selected={props.selected}>
		<ListCover>
			<Cover 
				src={props.item.cover}
				domain={props.item.domain}
				width={constants.list.coverWidth}
				height={constants.list.coverHeight} />
		</ListCover>
		<ListInfo>{ItemInfo(props)}</ListInfo>

		{props.selectModeEnabled ? 
			<ListSelectButton tall={props.showCollectionPath}><SelectIcon selected={props.selected} /></ListSelectButton> : 
			(props.showActions && <ListMoreButton onPress={props.onEdit}>{moreIcon}</ListMoreButton>)
		}
	</ListView>
)