import styled from 'styled-components/native'


export const Wrap = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({theme})=>theme.background.regular};
`

export const Message = styled.Text`
	margin: 16px;
	color: ${({theme})=>theme.text.regular};
`