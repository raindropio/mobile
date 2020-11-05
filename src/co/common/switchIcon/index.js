import React from 'react'
import {
	SwitchIconView,
	SwitchIconItem,
	SwitchIconImage
} from './style'
import {
	GotoView,
	GotoTitleText,
} from 'co/common/goto/style'
import { RectButton } from 'react-native-gesture-handler'

export default ({items, selected, onChange, last, label})=>(
	<GotoView last={last}>
		<GotoTitleText>{label}</GotoTitleText>

		<SwitchIconView>
			{items.map(({key, source})=>{
				return (
					<SwitchIconItem key={key}>
						<RectButton onPress={()=>onChange(key)}>
							<SwitchIconImage source={source} selected={selected == key} />
						</RectButton>
					</SwitchIconItem>
				)
			})}
		</SwitchIconView>
	</GotoView>
)