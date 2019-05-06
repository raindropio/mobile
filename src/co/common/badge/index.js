import React from 'react'
import {
	BadgeView,
	BadgeText,
	BadgeIconRight
} from './style'

const Badge = ({text, iconRight=false, ...original})=>(
	<BadgeView {...original}>
		<BadgeText>{text}</BadgeText>
		{iconRight && <BadgeIconRight source={iconRight} />}
	</BadgeView>
)

export default Badge