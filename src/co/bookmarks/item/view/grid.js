import React from 'react'
import { View, TouchableHighlight } from 'react-native'
import {
	styles,
	GridView,
	moreIcon,

	GridSelectButton,
	SelectIcon,
	constants
} from './style'

import ItemInfo from './info'
import Cover from 'co/common/cover'

export default (props)=>(
	<GridView columns={props.columns} selected={props.selected}>
		<View style={styles.gridCover}>
			<Cover
				src={props.item.cover}
				domain={props.item.domain}
				height={constants.grid.coverHeight}
				ar='4:3' />
		</View>
		<View style={styles.gridInfo}>
			{ItemInfo(props)}
		</View>
		
		{props.selectModeEnabled ? 
			<GridSelectButton><SelectIcon selected={props.selected} /></GridSelectButton> :
			(props.showActions && <TouchableHighlight underlayColor='transparent' style={styles.gridMoreButton} onPress={props.onEdit}>{moreIcon}</TouchableHighlight>)
		}
	</GridView>
)