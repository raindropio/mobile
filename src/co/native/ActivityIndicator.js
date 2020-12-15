import styled from 'styled-components/native'
import _ from 'lodash'

export const ActivityIndicator = styled.ActivityIndicator.attrs(({ color, theme })=>({
	color: theme.color[color] || _.get(theme, color) || theme.text.secondary
}))`
	margin: ${({theme})=>theme.padding.small}px;
`