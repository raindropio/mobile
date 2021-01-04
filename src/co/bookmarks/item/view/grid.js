import React from 'react'
import Icon from 'co/icon'

import {
	GridCover,
	GridView,
	GridAbout,
	GridInfo,
	GridMoreButton,
	moreIcon,

	GridSelectButton,
	constants
} from './style'

import ItemInfo from './info'
import Cover from 'co/bookmarks/item/view/cover'

export default (props)=>(
	<GridView selected={props.selected}>
		{!props.viewHide.includes('cover') && (
			<GridCover>
				<Cover
					src={props.item.cover}
					link={props.item.link}
					domain={props.item.domain}
					height={constants.grid.coverHeight}
					ar='4:3' />
			</GridCover>
		)}
		
		<GridAbout>
			<GridInfo>
				{ItemInfo(props)}
			</GridInfo>
			
			{props.selectModeEnabled ? 
				<GridSelectButton><Icon name={props.selected ? 'checkbox' : 'checkbox-blank'} variant={props.selected ? 'fill' : 'line'} color={props.selected ? 'accent' : undefined} /></GridSelectButton> :
				(props.showActions && <GridMoreButton underlayColor='transparent' onPress={props.onEdit}>{moreIcon}</GridMoreButton>)
			}
		</GridAbout>
	</GridView>
)