import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { 
	paddingHorizontal,
	fontSize
} from 'co/style/constants'
import {themed} from 'co/style/colors'

import {
	ItemTitle as _ItemTitle
} from 'co/style/item'

const gapVertical = paddingHorizontal-6
const gapHorizontal = paddingHorizontal-2

export const constants = {
	coverSize: 30
}
constants.itemHeight = constants.coverSize + (gapVertical*2)
constants.levelGap = constants.coverSize + gapHorizontal

export const styles = StyleSheet.create({
	expand: {
		paddingLeft: paddingHorizontal * 2,
		paddingRight: paddingHorizontal,
		marginLeft: paddingHorizontal * -1,
		height: constants.itemHeight,
		flexDirection: 'row',
		alignItems: 'center'
	}
})

export const ItemView = styled.View`
	flex-direction: row;
	align-items: center;
	padding-left: ${paddingHorizontal}px;
	padding-top: ${gapVertical}px;
	padding-bottom: ${gapVertical}px;
	height: ${constants.itemHeight}px;

	${({level=0}) => (
		`padding-left: ${paddingHorizontal + constants.levelGap * level}px;`
	)}

	${({theme, selected, color}) => {
		if (selected === true)
			return `background-color: ${theme.dark ? themed.invertedLight() : color || themed.tintColor()};`
	}}
`

export const ItemTitle = styled(_ItemTitle)`
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
	font-size: ${fontSize.micro}px;
	color: ${themed.invertedMedium};
	width: 36px;
	text-align: right;

	${({selected}) => {
		if (selected === true)
			return 'color: white;'
	}}
`

export const ItemExpandImage = styled.Image`
	tint-color: ${({theme, selected})=>{
		if (selected === true)
			return 'white'

		return themed.invertedMedium({theme})
	}};
`