import styled from 'styled-components/native'
import {Platform} from 'react-native'
import {themed} from 'co/style/colors'
import { fontSize, paddingHorizontal } from 'co/style/constants'

export const toolbarHeight = 48

export const Toolbar = styled.SafeAreaView`
	background-color: ${themed.tintColor};
	height: ${toolbarHeight}px;
`

export const Actions = styled.View`
	flex-direction: row;
	align-items: center;
	height: ${toolbarHeight}px;
`

export const CounterText = styled.Text`
	text-align: center;
	opacity: .85;
	color: #ffffff;
	font-size: ${fontSize.micro}px;
	padding-vertical: 6px;
	background-color: #00000020;
`

export const Action = styled.TouchableOpacity`
	height: ${toolbarHeight}px;
	flex: 1;
	justify-content: center;
	align-items: center;
	${({dark})=>dark?'background-color:rgba(0,0,0,.15);':''}
	${({disabled})=>disabled?'opacity:0.5;':''}
`

export const ActionImage = styled.Image`
	tint-color: ${themed.main};
`

export const Separator = styled.View`
	flex: .5;
	height: ${toolbarHeight/2}px;
	align-items: center;
	justify-content: center;
	margin-horizontal: ${paddingHorizontal}px;
`
export const SeparatorBorder = styled.View`
	background: #00000020;
	width: 1px;
	height: ${toolbarHeight/2}px;
`


export const Count = styled.Text`
	background-color: #00000060;
	color: white;
	padding: 1px 4px;
`