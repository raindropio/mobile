import React from 'react'
import { Switch } from './style'

import {
	GotoView,
	GotoImageView,
	GotoTitleText,
	GotoActionText
} from 'co/common/goto/style'

export default ({value, onChange, last, iconComponent, label, subLabel, children})=>(
	<GotoView last={last}>
		{iconComponent ? <GotoImageView>{iconComponent}</GotoImageView> : null}
		<GotoTitleText>{label}</GotoTitleText>
		<GotoActionText>{subLabel}</GotoActionText>

		{children}

		<Switch 
			value={value}
			onValueChange={onChange} />
	</GotoView>
)