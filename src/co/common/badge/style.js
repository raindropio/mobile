import styled from 'styled-components/native'
import { fontWeightMedium } from 'co/style/font'
import { fontSize, paddingHorizontal } from 'co/style/constants'
import colors from 'co/style/colors'

const margin = 5;

export const BadgeView = styled.View`
	flex-direction: row;
	align-items: center;
	background: ${colors.spaceGray};
	border-radius: 16px;
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

export const BadgeIconRight = styled.Image`
	tint-color: #ffffff95;
	margin-left: 4px;
`