import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	footer: {
		marginTop: 4,
		flexDirection: 'row',
		alignItems: 'center'
	},

	body: {
		flexDirection: 'row',
		borderLeftWidth: 2,
		borderLeftColor: 'blue',
		paddingLeft: 10,
		marginBottom: 4
	}
})

export const ItemTitle = styled.Text`
	font-size: ${({theme})=>theme.fontSize.primary}px;
	color: ${({theme})=>theme.text.regular};
	${({strikeLine}) => {
		var someStyle = ''
		if (strikeLine)
			someStyle += 'text-decoration-line: line-through; opacity: .7;'
		return someStyle
	}}
	${({bold, theme}) => bold && theme.fontWeight.semibold}}
`

export const ItemDescription = styled(ItemTitle)`
	flex: 1;
	font-size: ${({theme})=>theme.fontSize.primary}px;
	color: ${({theme})=>theme.text.secondary};
`

export const ItemSubinfo = styled(ItemDescription)`
	font-size: ${({theme})=>theme.fontSize.secondary}px;
	color: ${({theme})=>theme.text.secondary};
	${({bold, theme}) => bold && theme.fontWeight.semibold}}
`

export const ItemTags = styled.Text`
	font-size: ${({theme})=>theme.fontSize.primary}px;
	color: ${({theme})=>theme.color.accent};
	
`//padding-right: 24px;

export const ItemTypeImage = styled.Image`
	margin-right: 8px;
	tint-color: ${({theme})=>theme.text.secondary};
`

export const ItemStarImage = styled(ItemTypeImage)`
	tint-color: ${({theme})=>theme.color.accent};
`