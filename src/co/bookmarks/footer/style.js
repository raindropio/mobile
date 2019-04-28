import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import {themed} from 'co/style/colors'
import { fontSize } from 'co/style/constants'

//Title
export const footerHeight = 60;
export const FooterView = styled.View`
	justify-content: center;
	align-items: center;
	height: ${footerHeight}px;
	border-top-width: ${({line}) => line ? StyleSheet.hairlineWidth : 0}px;
	border-top-color: ${themed.inverted}15;
`

export const FooterText = styled.Text`
	font-size: ${fontSize.micro}px;
	color: ${themed.inverted}80;
`