import styled from 'styled-components/native'
import { fontSize, paddingHorizontal } from 'co/style/constants'
import {themed} from './colors'

export const EmptyView = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: ${paddingHorizontal*2}px;
`

export const EmptyTitle = styled.Text`
	font-size: ${fontSize.title}px;
	text-align: center;
	color: ${themed.inverted};
`

export const EmptySubTitle = styled.Text`
	font-size: ${fontSize.micro}px;
	color: ${themed.inverted}60;
	text-align: center;
	margin-top: 10px;
`

export const EmptyViewSpace = styled.View`
	height: 20px;
`

export const EmptyImage = styled.Image`
	margin-bottom: ${paddingHorizontal}px;
`

export const EmptyImageIcon = styled.Image`
	margin-bottom: ${paddingHorizontal}px;
	tint-color: ${themed.inverted}
`