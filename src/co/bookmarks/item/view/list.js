import React from 'react'
import { View, TouchableHighlight } from 'react-native'

import {
	styles,
	ListView,
	moreIcon,

	SelectIcon,
	ListSelectButton,
	constants
} from './style'

import ItemInfo from './info'
import Cover from 'co/common/cover'

export default (props)=>(
	<ListView selected={props.selected}>
		<View style={styles.listCover}>
			<Cover 
				src={props.item.cover}
				domain={props.item.domain}
				width={constants.list.coverWidth}
				height={constants.list.coverHeight} />
		</View>
		<View style={styles.listInfo}><ItemInfo {...props} /></View>

		{props.selectModeEnabled ? 
			<ListSelectButton><SelectIcon selected={props.selected} /></ListSelectButton> : 
			(props.showActions && <TouchableHighlight underlayColor='transparent' style={styles.listMoreButton} onPress={props.onEdit}>{moreIcon}</TouchableHighlight>)
		}
	</ListView>
)