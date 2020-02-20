import styled from 'styled-components/native'
import colors from 'co/style/colors'

export const LoadingWrap = styled.ActivityIndicator.attrs(props=>({
	color: colors.theme
}))`
	position: absolute;
	z-index: 1;
	left:0;right:0;bottom:0;top:0;
`