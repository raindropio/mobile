import styled from 'styled-components/native'

export const SubInfo = styled.View`
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	padding: ${({theme})=>theme.padding.medium}px;
`

export const SubInfoText = styled.Text`
	font-size: ${({theme})=>theme.fontSize.tertiary}px;
	color: ${({theme})=>theme.text.secondary};
	text-align: center;
`

export const SubInfoLink = styled(SubInfoText)`
	color: ${({theme})=>theme.color.accent};
`