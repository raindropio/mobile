import styled from 'styled-components/native'
import { themed } from 'co/style/colors'

export const LoadingWrap = styled.ActivityIndicator.attrs(props=>({
	color: themed.invertedMedium(props)
}))`
	position: absolute;
	z-index: 1;
	left:0;right:0;bottom:0;top:0;
`