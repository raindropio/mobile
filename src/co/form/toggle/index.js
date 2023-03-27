import { Switch } from './style'
import Icon from 'co/icon'

import {
	ImageView,
	GotoView,
	GotoTitleText,
	GotoActionText
} from 'co/goto/style'

export default ({value, onChange, last, icon, color, variant, label, subLabel, disabled, children})=>{
	let iconItself
	switch(typeof icon) {
		case 'string': iconItself = <Icon name={icon} color={color} variant={variant} />; break
		case 'object': iconItself = icon; break
	}

	return (
		<GotoView last={last}>
			{iconItself ? <ImageView>{iconItself}</ImageView> : null}
			<GotoTitleText>{label}</GotoTitleText>
			<GotoActionText>{subLabel}</GotoActionText>
	
			{children}
	
			<Switch 
				value={value}
				disabled={disabled}
				onValueChange={onChange} />
		</GotoView>
	)
}