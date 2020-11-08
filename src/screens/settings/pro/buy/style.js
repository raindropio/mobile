import styled from 'styled-components/native'
import SafeAreaView from 'react-native-safe-area-view'

export const Wrap = styled(SafeAreaView)`
	flex: 1;
	justify-content: center;
`

export const Loading = styled.ActivityIndicator.attrs(({theme})=>({
	color: theme.color.accent,
	animating: true
}))``

export const Periods = styled.View`
	
`