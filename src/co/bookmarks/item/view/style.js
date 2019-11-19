import React from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Platform } from 'react-native'
import { 
	paddingHorizontal
} from 'co/style/constants'
import {themed} from 'co/style/colors'
import Separator from 'co/style/separator'

const gap = paddingHorizontal

export const constants = {
	additionalHeight: 20,
	list: {
		coverWidth: 68,
		coverHeight: 54,
		height: gap+50+gap
	},

	simple: {
		coverSize: 28,
		height: gap+28+gap
	},

	grid: {
		coverHeight: 120,
		height: 120+96+(gap/2)
	}
}

//List

export const ListView = styled.View`
	flex-direction: row;
	padding-left: ${paddingHorizontal}px;
	${(props)=>itemSelectStyle(props)}
`

export const ListInfo = styled.View`
	padding-vertical: ${gap}px;
	justify-content: center;
	flex: 1;
	padding-left: ${gap}px;
`

export const ListCover = styled.View`
	margin-top: ${gap}px;
`

//Simple
export const SimpleView = styled(ListView)`
	${(props)=>itemSelectStyle(props)}
`

//Grid
export const GridWrapStyle = StyleSheet.create({
	columns: {
		paddingHorizontal: (paddingHorizontal / 2)
	}
})

export const GridWrap = styled.View`
	flex: ${({columns})=>1/columns};
	padding: 1px;
	padding-top: ${gap/2}px;
`

export const GridView = styled.View`
	padding-horizontal: ${paddingHorizontal / 2}px;
	${(props)=>itemSelectStyle(props)}
`

export const GridCover = styled.View`
	margin-top: ${gap/2}px;
`

export const GridInfo = styled.View`
	padding-vertical: 8px;
	padding-right: 24px;
`

export const Separators = {
	list: styled(Separator)`
		margin-left: ${constants.list.coverWidth+paddingHorizontal*2}px;
	`,
	simple: styled(Separator)`
		margin-left: ${constants.simple.coverSize+paddingHorizontal*2}px;
	`
}


//More icon
const MoreIconImage = styled.Image.attrs({
	fadeDuration:0
})`
	tint-color: ${({theme})=>theme.dark===true?'#8D8D8D':'#999999'};
`
const ic_more = require('assets/images/more.png')
export const moreIcon = <MoreIconImage source={ic_more} />

export const ListMoreButton = styled.TouchableHighlight.attrs({
	underlayColor: 'transparent'
})`
	padding-top: ${gap}px;
	padding-horizontal: ${paddingHorizontal}px;
`

export const SimpleMoreButton = styled(ListMoreButton)`
	
`

export const GridMoreButton = styled.TouchableHighlight.attrs({
	underlayColor: 'transparent'
})`
	position: absolute; bottom: 0; right: 0;
	width: 66px;
	height: 36px;
	margin-right: -16px;
	justify-content: center;
	align-items: center;
`


//Select
const itemSelectStyle = ({selected, theme})=>selected?`
	background: ${themed.tintColor({theme})}25;
`:''
const SelectIconImage = styled.Image.attrs({
	fadeDuration:0
})`
	width: 24px;
	height: 24px;
	tint-color: ${themed.tintColor};
`
const iconSelect = require('assets/images/select.png')
const iconSelectFilled = require('assets/images/selectFilled.png')
export const SelectIcon = ({selected})=><SelectIconImage source={selected?iconSelectFilled:iconSelect} />

export const ListSelectButton = styled.View`
	padding-horizontal: ${paddingHorizontal}px;
	justify-content: center;
`

export const SimpleSelectButton = styled.View`
	padding-horizontal: ${paddingHorizontal}px;
	justify-content: center;
`

export const GridSelectButton = styled.View`
	position: absolute; top: 6px; right: 6px;
	border-radius: 24px;
	background-color: ${themed.main};
`

