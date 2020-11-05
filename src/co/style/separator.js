import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export default styled.View`
	height: ${StyleSheet.hairlineWidth}px;
	background-color: #00000030;
	margin-left: ${({theme})=>theme.padding.medium}px;
`