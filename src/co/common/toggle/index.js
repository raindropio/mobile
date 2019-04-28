import React from 'react'
import Switch from 'react-native-switch-pro'
import colors, {themeIsDark} from 'co/style/colors'

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
			onSyncPress={onChange}
			backgroundActive={colors.theme}
			backgroundInactive={themeIsDark() ? '#ffffff30' : '#00000020'} />
	</GotoView>
)