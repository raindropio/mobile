import styled from 'styled-components/native'

export const LoadingWrap = styled.ActivityIndicator.attrs(({theme})=>({
	color: theme.color.accent
}))`
	position: absolute;
	z-index: 1;
	left:0;right:0;bottom:0;top:0;
`