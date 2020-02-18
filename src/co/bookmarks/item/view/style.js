import React from 'react'
import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { paddingHorizontal } from 'co/style/constants'
import { themed } from 'co/style/colors'

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

export const styles = StyleSheet.create({
	listInfo: {
		paddingVertical: gap,
		justifyContent: 'center',
		flex: 1,
		paddingLeft: gap
	},
	listCover: {
		marginTop: gap
	},
	listMoreButton: {
		paddingTop: gap,
		paddingHorizontal
	},

	columns: {
		paddingHorizontal: (paddingHorizontal / 2)
	},

	gridWrap: {
		flex: 1,
		paddingBottom: 1,
		paddingLeft: 1,
		paddingRight: 1,
		paddingTop: gap/2
	},
	gridCover: {
		marginTop: gap/2
	},
	gridInfo: {
		paddingVertical: 8,
		paddingRight: 24
	},
	gridMoreButton: {
		position: 'absolute',
		bottom: 0, right: 0,
		width: 66,
		height: 36,
		marginRight: -16,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

//List
export const ListView = styled.View`
	flex-direction: row;
	padding-left: ${paddingHorizontal}px;
	${(props)=>itemSelectStyle(props)}
`

//Simple
export const SimpleView = styled(ListView)`
	${(props)=>itemSelectStyle(props)}
`

export const GridView = styled.View`
	padding-horizontal: ${paddingHorizontal / 2}px;
	${(props)=>itemSelectStyle(props)}
`

//More icon
const MoreIconImage = styled.Image.attrs({
	fadeDuration:0
})`
	tint-color: ${({theme})=>theme.dark===true?'#8D8D8D':'#999999'};
`
const ic_more = require('assets/images/more.png')
export const moreIcon = <MoreIconImage source={ic_more} />

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

