import React from 'react'

import {
	GridView,
	GridInfo,
	GridCover,
	GridMoreButton,
	moreIcon,

	GridSelectButton,
	SelectIcon,
	constants
} from './style'

import ItemInfo from './info'
import Cover from 'co/common/cover'

export default (props)=>(
	<GridView columns={props.columns} tall={props.showCollectionPath} selected={props.selected}>
		<GridCover>
			<Cover
				src={props.item.cover}
				domain={props.item.domain}
				height={constants.grid.coverHeight}
				ar='4:3' />
		</GridCover>
		<GridInfo>{ItemInfo(props)}</GridInfo>
		
		{props.selectModeEnabled ? 
			<GridSelectButton tall={props.showCollectionPath}><SelectIcon selected={props.selected} /></GridSelectButton> :
			(props.showActions && <GridMoreButton tall={props.showCollectionPath} onPress={props.onEdit}>{moreIcon}</GridMoreButton>)
		}
	</GridView>
)