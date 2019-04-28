import React from 'react'

import {
	ListView,
	ListInfo,
	ListMoreButton,
	ListCover,
	moreIcon,

	SelectIcon,
	ListSelectButton
} from './style'

import ItemInfo from './info'
import Cover from 'co/common/cover'

export default (props)=>(
	<ListView tall={props.showCollectionPath} selected={props.selected}>
		<ListCover><Cover images={props.covers} domain={props.item.domain} size='list' /></ListCover>
		<ListInfo>{ItemInfo(props)}</ListInfo>

		{props.selectModeEnabled ? 
			<ListSelectButton tall={props.showCollectionPath}><SelectIcon selected={props.selected} /></ListSelectButton> : 
			<ListMoreButton onPress={props.onEdit}>{moreIcon}</ListMoreButton>
		}
	</ListView>
)