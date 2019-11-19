import React from 'react'
import getFavicon from 'data/modules/format/favicon'

import {
	SimpleView,
	ListInfo,
	ListCover,
	SimpleMoreButton,
	moreIcon,

	SelectIcon,
	SimpleSelectButton,
	constants
} from './style'

import ItemInfo from './info'

import Cover from 'co/common/cover'

export default (props)=>(
	<SimpleView tall={props.showCollectionPath} selected={props.selected}>
		<ListCover>
			<Cover
				src={getFavicon(props.item.domain)}
				domain={props.item.domain}
				width={constants.simple.coverSize}
				height={constants.simple.coverSize} />
		</ListCover>
		<ListInfo>{ItemInfo(props)}</ListInfo>

		{props.selectModeEnabled ? 
			<SimpleSelectButton tall={props.showCollectionPath}><SelectIcon selected={props.selected} /></SimpleSelectButton> : 
			(props.showActions && <SimpleMoreButton onPress={props.onEdit}>{moreIcon}</SimpleMoreButton>)
		}
	</SimpleView>
)