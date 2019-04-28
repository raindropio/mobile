import styled from 'styled-components/native'
import { 
	paddingHorizontal,
	fontSize
} from 'co/style/constants'
import {themed} from 'co/style/colors'

import {
	ItemTitle as _ItemTitle
} from 'co/style/item'

import Separator from 'co/style/separator'

const gapVertical = paddingHorizontal-6
const gapHorizontal = paddingHorizontal-2

export const constants = {
	coverSize: 30
}
constants.itemHeight = constants.coverSize + (gapVertical*2)
constants.levelGap = constants.coverSize + gapHorizontal

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

	${({theme}) => {
		if (theme.itemSelected === true)
			return `background-color: ${theme.dark ? themed.invertedLight() : theme.tintColor || themed.tintColor()};`
	}}
`

export const ItemSeparator = styled(Separator)`
	${({leadingItem}) => (
		`margin-left: ${constants.levelGap * (leadingItem.level+1) + paddingHorizontal}px;`
	)}
`

export const ItemTitle = styled(_ItemTitle)`
	padding-left: ${gapHorizontal};
	flex: 1;

	${({theme}) => {
		if (theme.itemSelected === true || theme.dark === true)
			return 'color: white;'
	}}
`

export const ItemCount = styled.Text`
	font-size: ${fontSize.micro};
	color: ${themed.invertedMedium};

	${({theme}) => {
		if (theme.itemSelected === true || theme.dark === true)
			return 'color: white;'
	}}
`

export const ItemExpand = styled.View`
	padding-left: ${paddingHorizontal * 2};
	padding-right: ${paddingHorizontal};
	margin-left: ${paddingHorizontal * -1};
	height: ${constants.itemHeight}px;
	flex-direction: row;
	align-items: center;
`

export const ItemExpandImage = styled.Image`
	tint-color: ${({theme})=>{
		if (theme.itemSelected === true)
			return 'white'

		return themed.invertedMedium({theme})
	}};
`