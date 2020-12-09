import styled from 'styled-components/native'

export const Wrap = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

export const Message = styled.Text`
	margin: ${({theme})=>theme.padding.medium}px;
	font-size: ${({theme})=>theme.fontSize.primary}px;
	color: ${({theme})=>theme.text.regular};
	text-align: center;
`