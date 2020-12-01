import styled from 'styled-components/native'

export const ActivityIndicator = styled.ActivityIndicator.attrs(({theme})=>({
	color: theme.text.secondary
}))`
	margin: ${({theme})=>theme.padding.small}px;
`