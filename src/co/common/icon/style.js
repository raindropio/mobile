import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import size from 'modules/appearance/size'

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
		width: size.height.icon,
		height: size.height.icon,
	}
})