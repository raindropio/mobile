import styled from 'styled-components/native'
import Icon from 'co/icon'

export const EmptyView = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	padding: ${({theme})=>theme.padding.medium*2}px;
`

export const EmptyTitle = styled.Text`
	font-size: ${({theme})=>theme.fontSize.primary}px;
	text-align: center;
	color: ${({theme})=>theme.text.regular};
`

export const EmptySubTitle = styled.Text`
	font-size: ${({theme})=>theme.fontSize.tertiary}px;
	color: ${({theme})=>theme.text.tertiary};
	text-align: center;
	margin-top: 10px;
`

export const EmptyViewSpace = styled.View`
	height: 20px;
`

export const EmptyImage = styled.Image`
	margin-bottom: ${({theme})=>theme.padding.medium}px;
`

export const EmptyImageIcon = styled(Icon)`
	margin-bottom: ${({theme})=>theme.padding.medium}px;
`