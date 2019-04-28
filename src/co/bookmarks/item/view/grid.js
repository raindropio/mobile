import React from 'react'

import {
	GridView,
	GridInfo,
	GridCover,
	GridMoreButton,
	moreIcon,

	GridSelectButton,
	SelectIcon
} from './style'

import ItemInfo from './info'
import Cover from 'co/common/cover'

export default (props)=>(
	<GridView columns={props.columns} tall={props.showCollectionPath} selected={props.selected}>
		<GridCover><Cover images={props.covers} domain={props.item.domain} size='grid' /></GridCover>
		<GridInfo>{ItemInfo(props)}</GridInfo>
		
		{props.selectModeEnabled ? 
			<GridSelectButton tall={props.showCollectionPath}><SelectIcon selected={props.selected} /></GridSelectButton> :
			<GridMoreButton tall={props.showCollectionPath} onPress={props.onEdit}>{moreIcon}</GridMoreButton>
		}
	</GridView>
)