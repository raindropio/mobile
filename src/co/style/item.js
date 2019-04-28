import styled from 'styled-components/native'
import { fontWeightMedium } from 'co/style/font'
import { fontSize } from 'co/style/constants'
import { themed } from './colors'

export const ItemTitle = styled.Text`
	font-size: ${fontSize.normal}px;
	color: ${themed.inverted};
	${({strikeLine}) => {
		var someStyle = ''
		if (strikeLine)
			someStyle += 'text-decoration-line: line-through; opacity: .7;'
		return someStyle
	}}
	${({bold}) => bold && fontWeightMedium()}
`

export const ItemDescription = styled(ItemTitle)`
	flex: 1;
	font-size: ${fontSize.normal}px;
	color: ${themed.invertedDark};
`

export const ItemSubinfo = styled(ItemDescription)`
	font-size: ${fontSize.sub}px;
	color: ${themed.invertedMedium};
	${({bold}) => bold && fontWeightMedium()}
`

export const ItemTags = styled.Text`
	font-size: ${fontSize.normal}px;
	color: ${themed.tintColor};
	
`//padding-right: 24px;

export const ItemFooterView = styled.View`
	margin-top: 4px;
	flex-direction: row;
	align-items: center;
`//padding-right: 24px;

export const ItemTypeImage = styled.Image`
	margin-right: 8px;
	tint-color: ${themed.invertedMedium};
`

export const ItemStarImage = styled(ItemTypeImage)`
	tint-color: ${themed.tintColor};
`