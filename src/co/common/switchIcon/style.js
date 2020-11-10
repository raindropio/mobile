import styled from 'styled-components/native'
import Icon from 'co/icon'

export const SwitchIconView = styled.View`
	flex-direction: row;
	align-items: center;
`

export const SwitchIconItem = styled.View`
	border-radius: 10px;
	overflow: hidden;
`

export const SwitchIconImage = styled(Icon)`
	margin: ${({theme})=>theme.padding.small}px ${({theme})=>theme.padding.small}px;
`