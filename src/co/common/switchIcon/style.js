import styled from 'styled-components/native'

export const SwitchIconView = styled.View`
	flex-direction: row;
	align-items: center;
`

export const SwitchIconItem = styled.View`
	border-radius: 10px;
	overflow: hidden;
`

export const SwitchIconImage = styled.Image`
	margin: ${({theme})=>theme.padding.medium-4}px ${({theme})=>theme.padding.medium}px;
	tint-color: ${({ theme, selected }) => selected ? theme.color.accent : theme.text.disabled};
`