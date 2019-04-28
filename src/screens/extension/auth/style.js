import styled from 'styled-components/native'
import { themed } from 'co/style/colors'

export const Wrap = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${themed.main};
`

export const Message = styled.Text`
	margin: 16px;
	color: ${themed.inverted};
`