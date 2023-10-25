import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	footer: {
		marginTop: 4,
		flexDirection: 'row',
		alignItems: 'center'
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
`

export const ItemDescription = styled(ItemTitle)`
	flex: 1;
`

export const ItemSubinfo = styled(ItemDescription)`
	font-size: ${({theme})=>theme.fontSize.secondary}px;
	color: ${({theme})=>theme.text.secondary};
`

export const ItemTags = styled.Text`
	font-size: ${({theme})=>theme.fontSize.primary}px;
	color: ${({theme})=>theme.color.accent};
	
`//padding-right: 24px;