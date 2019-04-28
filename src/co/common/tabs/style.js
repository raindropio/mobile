import styled from 'styled-components/native'
import {StyleSheet} from 'react-native'
import { paddingHorizontal, fontSize } from 'co/style/constants'
import colors, {themed} from 'co/style/colors'

export const TabsView = styled.View`
	flex-direction: row;
	background: ${themed.main};
	
`//padding-horizontal: ${paddingHorizontal}px;

export const TabItem = styled.TouchableOpacity`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 44px;
	padding-bottom: ${({active})=>active?StyleSheet.hairlineWidth:2};
	border-bottom-width: ${({active})=>active?2:StyleSheet.hairlineWidth};
	border-color: ${({active})=>active?colors.theme:themed.invertedLight()};
`

export const TabText = styled.Text`
	font-size: ${fontSize.normal}px;
	color: ${({active})=>active?colors.theme:colors.textGray};
`