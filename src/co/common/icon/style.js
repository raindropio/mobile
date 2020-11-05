import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { constants } from 'co/collections/item/style'

export const styles = StyleSheet.create({
	big: {
		width: 48,
		height: 48,
	},
	list: {
		width: 24,
		height: 24,
	},
	small: {
		width: 16,
		height: 16,
	},
	default: {
		width: constants.coverSize,
		height: constants.coverSize,
	}
})

export const DefaultIconImage = styled.Image`
	tint-color: ${({theme})=>theme.text.secondary}
`