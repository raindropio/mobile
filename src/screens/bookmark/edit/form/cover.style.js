import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Tap = styled(RectButton)`
	margin: ${({theme})=>theme.padding.medium}px;
	align-items: flex-start;
	justify-content: flex-start;
`