import React from 'react'
import { Switch } from './style'

import {
	ImageView,
	GotoView,
	GotoIcon,
	GotoTitleText,
	GotoActionText
} from 'co/common/goto/style'

export default ({value, onChange, last, icon, iconComponent, label, subLabel, children})=>(
	<GotoView last={last}>
		{icon || iconComponent ? <ImageView>{icon ? <GotoIcon source={icon} /> : iconComponent}</ImageView> : null}
		<GotoTitleText>{label}</GotoTitleText>
		<GotoActionText>{subLabel}</GotoActionText>

		{children}

		<Switch 
			value={value}
			onValueChange={onChange} />
	</GotoView>
)