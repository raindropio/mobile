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
			{items.map(({key, name})=>{
				return (
					<SwitchIconItem key={key}>
						<RectButton onPress={()=>onChange(key)}>
							<SwitchIconImage 
								name={name} 
								color={selected == key ? 'accent' : 'text.secondary'} />
						</RectButton>
					</SwitchIconItem>
				)
			})}
		</SwitchIconView>
	</GotoView>
)