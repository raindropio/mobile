import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export const iconSize = 52

export const IconTap = styled(RectButton)`
	height: ${iconSize}px;
	flex: 1;
	align-items: center;
	justify-content: center;
	${({active, theme})=>{
		if (active)
			return `
				border-radius: 6px;
				background: ${theme.color.accent};
			`
		return ''
	}}
`

export const GridView = styled.FlatList.attrs(({theme})=>({
	columnWrapperStyle: {
		paddingHorizontal: theme.padding.small
	}
}))``

export const Wrap = styled(SafeAreaView)`
	flex:1;
	background: ${({theme})=>theme.background.regular};
`