import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const CoverTap = styled(RectButton)`
	align-self: center;
	padding: ${({theme})=>theme.padding.small+4}px;
`

export const CoverWrap = styled.View`
	background-color: ${({theme})=>theme.background.regular};
	position: relative;
`