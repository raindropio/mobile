import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

//Title
export const footerHeight = 60;
export const FooterView = styled.View`
	justify-content: center;
	align-items: center;
	height: ${footerHeight}px;
	margin-bottom: 32px;
	border-top-width: ${({line}) => line ? StyleSheet.hairlineWidth : 0}px;
	border-top-color: ${({theme})=>theme.color.border};
`

export const FooterText = styled.Text`
	font-size: ${({theme})=>theme.fontSize.tertiary}px;
	color: ${({theme})=>theme.text.secondary};
`