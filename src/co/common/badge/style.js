import styled from 'styled-components/native'
import { fontWeightMedium } from 'co/style/font'
import { fontSize, paddingHorizontal } from 'co/style/constants'
import colors from 'co/style/colors'

const margin = 5;

export const BadgeView = styled.View`
	background: ${colors.spaceGray};
	border-radius: 10px;
	padding-horizontal: 6px;
	${({marginRight})=>{
		var style=''
		if (marginRight)
			style+=`margin-right: ${margin}px;`
		return style;
	}}
`

export const BadgeText = styled.Text`
	background-color: transparent;
	font-size: ${fontSize.micro}px;
	${fontWeightMedium()}
	color: #ffffff;
`