import React from 'react'
import {
	BadgeView,
	BadgeText
} from './style'

const Badge = ({text, marginRight})=>(
	<BadgeView marginRight={marginRight}>
		<BadgeText>{text}</BadgeText>
	</BadgeView>
)

export default Badge