import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { paddingHorizontal } from 'co/style/constants'
import {themed} from 'co/style/colors'

export const iconSize = 20 + (paddingHorizontal*2);

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

export const GridView = styled.FlatList``

export const GridStyle = StyleSheet.create({
	columns: {
		paddingHorizontal: (paddingHorizontal / 2)
	}
})

export const Wrap = styled.View`
	flex:1;
`