import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'
import size from 'modules/appearance/size'
import { dragItemStyle } from 'co/list/flat/sortable'

import {
	ItemTitle as _ItemTitle
} from 'co/style/item'

const gapVertical = 10
const gapHorizontal = 14

export const constants = {}
constants.levelGap = size.height.icon + gapHorizontal

export const Expand = styled.View`
	padding-left: ${({theme})=>theme.padding.medium * 2}px;
	padding-right: ${({theme})=>theme.padding.medium}px;
	margin-left: ${({theme})=>theme.padding.medium * -1}px;
	height: ${({theme})=>theme.height.item}px;
	flex-direction: row;
	align-items: center;
`

export const ItemView = styled.View`
	flex-direction: row;
	align-items: center;
	padding-left: ${({theme})=>theme.padding.medium}px;
	padding-top: ${gapVertical}px;
	padding-bottom: ${gapVertical}px;
	height: ${({theme})=>theme.height.item}px;

	${({level=0, theme}) => (
		`padding-left: ${theme.padding.medium + constants.levelGap * level}px;`
	)}

	${props => {
		const {theme, selected, color, isDrag} = props
		let styles = ''

		if (isDrag)
			styles+=dragItemStyle(props)

		if (selected === true)
			styles += `background-color: ${theme.dark ? theme.text.disabled : color || theme.color.accent};`

		if (styles)
			return styles
	}}
`

export const ItemTitle = styled(_ItemTitle).attrs({
	numberOfLines: 1,
	ellipsizeMode: 'head'
})`
	padding-left: ${gapHorizontal}px;
	flex: 1;

	${({theme, selected}) => {
		if (selected === true || theme.dark === true)
			return 'color: white;'
	}}
`

export const ItemCount = styled.Text.attrs({
	numberOfLines: 1
})`
	font-size: ${({theme})=>theme.fontSize.tertiary}px;
	color: ${({theme})=>theme.text.tertiary};
	min-width: 36px;
	text-align: right;

	${({selected}) => {
		if (selected === true)
			return 'color: white;'
	}}
`

export const Action = styled(BorderlessButton).attrs({
	exclusive: true
})`
	padding: 0 ${({theme})=>theme.padding.medium}px;
	height: ${({theme})=>theme.height.item}px;
	align-items: center;
	justify-content: center;
`