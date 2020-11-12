import React from 'react'
import Icon from 'co/icon'

import {
	ListCover,
	ListView,
	ListInfo,
	ListMoreButton,
	moreIcon,

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
			<ListSelectButton><Icon name={props.selected ? 'checkbox' : 'checkbox-blank'} variant={props.selected ? 'fill' : 'line'} color={props.selected ? 'accent' : undefined} /></ListSelectButton> : 
			(props.showActions && <ListMoreButton onPress={props.onEdit}>{moreIcon}</ListMoreButton>)
		}
	</ListView>
)