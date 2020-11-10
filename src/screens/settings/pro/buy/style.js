import styled from 'styled-components/native'


export const Wrap = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
`

export const Loading = styled.ActivityIndicator.attrs(({theme})=>({
	color: theme.color.accent,
	animating: true
}))``

export const Periods = styled.View`
	
`