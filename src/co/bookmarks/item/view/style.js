import React from 'react'
import styled from 'styled-components/native'
import { BorderlessButton } from 'react-native-gesture-handler'
import Icon from 'co/icon'
import { dragItemStyle } from 'co/list/flat/sortable'

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
`

export const ListCover = styled.View`
	margin-top: ${gap}px;
	margin-right: ${gap}px;
`

export const ListMoreButton = styled(BorderlessButton)`
	padding-top: ${gap}px;
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
`

//Simple
export const SimpleView = ListView

//Grid
export const GridWrap = styled.View`
	flex: ${({numColumns})=>1 / numColumns};
	padding-bottom: ${gap/2}px;
	overflow: hidden;
`

export const GridView = styled.View`
	flex: 1;
	padding-horizontal: ${({theme})=>theme.padding.small}px;
	${props=>itemSelectStyle(props)}
`

export const GridCover = styled.View`
	margin-top: ${gap/2}px;
`

export const GridAbout = styled.View`
	flex-direction: row;
`

export const GridInfo = styled.View`
	flex: 1;
	padding-vertical: ${({theme})=>theme.padding.small}px;
`

export const GridMoreButton = styled(BorderlessButton)`
	alignSelf: flex-end;
	width: 36px;
	height: 36px;
	justifyContent: center;
	alignItems: center;
`

//More icon
export const moreIcon = <Icon name='more' />

//Select
const itemSelectStyle = props=>{
	if (props.selected)
		return `background: ${props.theme.color.accent}25;`

	return dragItemStyle(props)
}

export const ListSelectButton = styled.View`
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
	justify-content: center;
`

export const SimpleSelectButton = styled.View`
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
	justify-content: center;
`

export const GridSelectButton = styled.View`
	alignSelf: flex-end;
`

export const TypeIcon = styled(Icon)`
	margin: 0;
	margin-right: ${({theme})=>theme.padding.small}px;
`