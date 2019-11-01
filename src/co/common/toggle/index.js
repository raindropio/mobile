import React from 'react'
import { Switch } from './style'

import {
	GotoView,
	GotoIcon,
	GotoImageView,
	GotoTitleText,
	GotoActionText
} from 'co/common/goto/style'

export default ({value, onChange, last, icon, iconComponent, label, subLabel, children})=>(
	<GotoView last={last}>
		{icon || iconComponent ? <GotoImageView>{icon ? <GotoIcon source={icon} /> : iconComponent}</GotoImageView> : null}
		<GotoTitleText>{label}</GotoTitleText>
		<GotoActionText>{subLabel}</GotoActionText>

		{children}

		<Switch 
			value={value}
			onValueChange={onChange} />
	</GotoView>
)