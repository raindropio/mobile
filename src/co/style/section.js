import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const sectionHeight = 46;

export const SectionView = styled.View`
	flex-direction: row;
	padding-left: ${({theme})=>theme.padding.medium}px;
	padding-right: ${({theme})=>theme.padding.medium}px;
	height: ${sectionHeight}px;
	align-items: center;
	background-color: ${({ theme })=>{
		if (theme.sectionActive === true)
			return theme.dark ? theme.text.disabled : theme.tintColor || theme.color.accent

		return (theme.backgroundColor || theme.background.regular)
	}};
	border-bottom-color: ${({theme})=>theme.text.disabled};
	border-top-color: ${({theme})=>theme.text.disabled};
	border-top-width: ${StyleSheet.hairlineWidth}px;
`

export const SectionEmpty = styled.View`
	
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
`


export const SectionButtonView = styled.View`
	margin-right: ${({theme})=>theme.padding.medium * -1}px;
`

export const SectionButtonText = styled(SectionText)`
	
`