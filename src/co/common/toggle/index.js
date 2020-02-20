import React from 'react'
import { View } from 'react-native'
import { Switch } from './style'

import {
	styles,
	GotoView,
	GotoIcon,
	GotoTitleText,
	GotoActionText
} from 'co/common/goto/style'

export default ({value, onChange, last, icon, iconComponent, label, subLabel, children})=>(
	<GotoView last={last}>
		{icon || iconComponent ? <View style={styles.imageView}>{icon ? <GotoIcon source={icon} /> : iconComponent}</View> : null}
		<GotoTitleText>{label}</GotoTitleText>
		<GotoActionText>{subLabel}</GotoActionText>

		{children}

		<Switch 
			value={value}
			onValueChange={onChange} />
	</GotoView>
)