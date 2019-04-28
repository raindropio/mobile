import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { paddingHorizontal } from 'co/style/constants'
import {iconSize as _icosizes} from 'co/common/icon/style'
import {themed} from 'co/style/colors'

export const iconSize = _icosizes.big + (paddingHorizontal*2);

export const IconTap = styled.TouchableOpacity`
	height: ${iconSize}px;
	flex: 1;
	align-items: center;
	justify-content: center;
	${({active, theme})=>{
		if (active)
			return `
				border-radius: 6px;
				background: ${themed.tintColor({theme})};
			`
		return ''
	}}
`

export const GridView = styled.FlatList`
	flex: 1;
	width: 100%;
`

export const GridStyle = StyleSheet.create({
	columns: {
		paddingHorizontal: (paddingHorizontal / 2)
	}
})

export const Wrap = styled.View`
	flex:1;
`

export const PagesView = styled.View`
	background-color: ${themed.main};
	align-items: center;
	justify-content: center;
	padding: ${paddingHorizontal/2}px;
	border-bottom-width: ${StyleSheet.hairlineWidth}px;
	border-bottom-color: ${themed.invertedLight};
	flex-direction: row;
`

export const PageIndicator = styled.View`
	margin: 4px;
	width: 6px;
	height: 6px;
	border-radius: 8px;
	background: ${({active, theme})=>active?themed.tintColor({theme}):'rgba(0,0,0,.2)'};
`