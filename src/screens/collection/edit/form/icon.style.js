import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const IconTap = styled(RectButton)`
	align-items: center;
	padding: ${({theme})=>theme.padding.medium}px;
	background-color: ${({theme})=>theme.background.regular};
`