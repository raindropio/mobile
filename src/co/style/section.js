import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const SectionView = styled.View`
	flex-direction: row;
	padding-left: ${({theme})=>theme.padding.medium}px;
	height: ${({theme})=>theme.height.item}px;
	align-items: center;
	background-color: ${({ theme })=>{
		if (theme.sectionActive === true)
			return theme.dark ? theme.text.disabled : theme.tintColor || theme.color.accent

		return (theme.backgroundColor || theme.background.regular)
	}};
	border-bottom-color: ${({theme})=>theme.color.border};
	border-bottom-width: ${({noBorder})=>noBorder ? 0 : StyleSheet.hairlineWidth}px;
`

export const SectionSubText = styled.Text`
	font-size: ${({theme})=>theme.fontSize.secondary}px;
	color: ${({theme})=>theme.text.secondary};

	${({theme}) => {
		if (theme.sectionActive === true)
			return 'color: white;'
	}}
`

export const SectionText = styled(SectionSubText)`
	flex: 1;
	text-align: ${({center})=>center?'center':'left'};
`