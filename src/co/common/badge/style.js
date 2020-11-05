import styled from 'styled-components/native'

const margin = 5;

export const BadgeView = styled.View`
	flex-direction: row;
	align-items: center;
	background: ${({theme})=>theme.color.broken};
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
	font-size: ${({theme})=>theme.fontSize.tertiary}px;
	${({theme})=>theme.fontWeight.semibold}
	color: #ffffff;
`

export const BadgeIconRight = styled.Image`
	tint-color: #ffffff95;
	margin-left: 4px;
`