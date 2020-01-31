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
	<GridView columns={props.columns} selected={props.selected}>
		<GridCover>
			<Cover
				src={props.item.cover}
				domain={props.item.domain}
				height={constants.grid.coverHeight}
				ar='4:3' />
		</GridCover>
		<GridInfo>{ItemInfo(props)}</GridInfo>
		
		{props.selectModeEnabled ? 
			<GridSelectButton><SelectIcon selected={props.selected} /></GridSelectButton> :
			(props.showActions && <GridMoreButton onPress={props.onEdit}>{moreIcon}</GridMoreButton>)
		}
	</GridView>
)