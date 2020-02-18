import React from 'react'
import getFavicon from 'data/modules/format/favicon'
import { View, TouchableHighlight } from 'react-native'
import {
	styles,
	SimpleView,
	moreIcon,

	SelectIcon,
	SimpleSelectButton,
	constants
} from './style'

import ItemInfo from './info'

import Cover from 'co/common/cover'

export default (props)=>(
	<SimpleView selected={props.selected}>
		<View style={styles.listCover}>
			<Cover
				src={getFavicon(props.item.domain)}
				domain={props.item.domain}
				width={constants.simple.coverSize}
				height={constants.simple.coverSize} />
		</View>
		<View style={styles.listInfo}>{ItemInfo(props)}</View>

		{props.selectModeEnabled ? 
			<SimpleSelectButton><SelectIcon selected={props.selected} /></SimpleSelectButton> : 
			(props.showActions && <TouchableHighlight underlayColor='transparent' style={styles.listMoreButton} onPress={props.onEdit}>{moreIcon}</TouchableHighlight>)
		}
	</SimpleView>
)