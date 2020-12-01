import React from 'react'
import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'
import Icon from 'co/icon'

const gap = 16

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
	padding-left: ${({theme})=>theme.padding.medium}px;
	${props=>itemSelectStyle(props)}
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

export const ListMoreButton = styled(BorderlessButton)`
	padding-top: ${gap}px;
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
`

//Simple
export const SimpleView = styled(ListView)`
	${props=>itemSelectStyle(props)}
`

//Grid
export const GridWrap = styled.View`
	flex: ${({numColumns})=>1 / numColumns};
	paddingBottom: ${gap/2}px;
`

export const GridView = styled.View`
	padding-horizontal: ${({theme})=>theme.padding.small}px;
	${props=>itemSelectStyle(props)}
`

export const GridCover = styled.View`
	margin-top: ${gap/2}px;
`

export const GridInfo = styled.View`
	padding-vertical: ${({theme})=>theme.padding.small}px;
	padding-right: ${({theme})=>theme.padding.large}px;
`

export const GridMoreButton = styled(BorderlessButton)`
	position: absolute;
	bottom: 0;
	right: 0;
	width: 66px;
	height: 36px;
	marginRight: ${({theme})=>theme.padding.medium * -1}px;
	justifyContent: center;
	alignItems: center;
`

//More icon
export const moreIcon = <Icon name='more' />

//Select
const itemSelectStyle = ({selected, theme})=>selected?`
	background: ${theme.color.accent}25;
`:''

export const ListSelectButton = styled.View`
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
	justify-content: center;
`

export const SimpleSelectButton = styled.View`
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
	justify-content: center;
`

export const GridSelectButton = styled.View`
	position: absolute; top: 6px; right: 6px;
	border-radius: 3px;
	background-color: ${({theme})=>theme.background.regular};
`

export const TypeIcon = styled(Icon)`
	margin: 0;
	margin-right: ${({theme})=>theme.padding.small}px;
`