import styled from 'styled-components/native'
import colors from 'co/style/colors'

export const Wrap = styled.SafeAreaView`
	flex: 1;
	justify-content: center;
`

export const Loading = styled.ActivityIndicator.attrs({
	color: colors.theme,
	animating: true
})``

export const Periods = styled.View`
	
`