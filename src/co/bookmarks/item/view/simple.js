import React from 'react'

import {
	SimpleView,
	ListInfo,
	ListCover,
	SimpleMoreButton,
	moreIcon,

	SelectIcon,
	SimpleSelectButton
} from './style'

import ItemInfo from './info'

import Cover from 'co/common/cover'

export default (props)=>(
	<SimpleView tall={props.showCollectionPath} selected={props.selected}>
		<ListCover><Cover src={props.covers.favicon} domain={props.item.domain} size='simple' /></ListCover>
		<ListInfo>{ItemInfo(props)}</ListInfo>

		{props.selectModeEnabled ? 
			<SimpleSelectButton tall={props.showCollectionPath}><SelectIcon selected={props.selected} /></SimpleSelectButton> : 
			(props.showActions && <SimpleMoreButton onPress={props.onEdit}>{moreIcon}</SimpleMoreButton>)
		}
	</SimpleView>
)