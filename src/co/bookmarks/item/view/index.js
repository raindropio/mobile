import { View } from 'react-native'
import Swipeable, { Button } from 'co/list/swipeable'
import { Touchable } from 'react-native-gesture-handler'

import ListView from './list'
import SimpleView from './simple'
import GridView from './grid'

const flexOne = {flex:1}

export default function BookmarkView({ view, onItemPress, viewHide=[], highlight={}, ...props }) {
	const etc = { ...props, viewHide, highlight }

	const leftActions = ()=>(
		<Button 
			icon='checkbox-multiple'
			background='color.yellow'
			color='black'
			onPress={etc.onSelect} />
	)

	const rightActions = ()=>[
		<Button
			key='share'
			icon='share'
			onPress={etc.onShare} />,

		<Button 
			key='move'
			icon='folder-shared'
			background='color.purple'
			onPress={etc.onMove} />,

		<Button 
			key='remove'
			icon='delete-bin'
			background='color.danger'
			onPress={etc.onRemove} />
	]

	switch(view){
		case 'grid':
		case 'masonry':{
			return (
				<View style={flexOne}>
					<Touchable androidRipple={{}} onPress={onItemPress} >
						<GridView {...etc} />
					</Touchable>
				</View>
			)
		}

		default:{
			return (
				<Swipeable 
					left={etc.showActions && !etc.selectModeEnabled ? leftActions : undefined}
					right={etc.showActions && !etc.selectModeEnabled ? rightActions : undefined}>
					<Touchable
						androidRipple={{}}
						onPress={onItemPress}>
						{view == 'simple' ? SimpleView(etc) : ListView(etc)}
					</Touchable>
				</Swipeable>
			)
		}
	}
}