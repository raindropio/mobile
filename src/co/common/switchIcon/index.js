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
import TouchItem from 'co/common/touchItem'

export default ({items, selected, onChange, last, label})=>(
	<GotoView last={last}>
		<GotoTitleText>{label}</GotoTitleText>

		<SwitchIconView>
			{items.map(({key, source})=>{
				return (
					<SwitchIconItem key={key}>
						<TouchItem onPress={()=>onChange(key)}>
							<SwitchIconImage source={source} selected={selected == key} />
						</TouchItem>
					</SwitchIconItem>
				)
			})}
		</SwitchIconView>
	</GotoView>
)