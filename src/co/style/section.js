import {Platform, StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import { paddingHorizontal, fontSize } from './constants'
import {themed} from 'co/style/colors'

export const sectionHeight = 46;

export const SectionView = styled.View`
	flex-direction: row;
	padding-left: ${paddingHorizontal}px;
	padding-right: ${paddingHorizontal}px;
	height: ${sectionHeight}px;
	align-items: center;
	background-color: ${props=>{
		if (props.theme.sectionActive === true)
			return props.theme.dark ? themed.invertedLight(props) : props.theme.tintColor || themed.tintColor(props)

		return (props.theme.backgroundColor || themed.main(props))
	}};
	border-bottom-color: ${themed.invertedLight};
	border-top-color: ${themed.invertedLight};
	border-top-width: ${StyleSheet.hairlineWidth}px;
`

export const SectionEmpty = styled.View`
	
`

export const SectionSubText = styled.Text`
	font-size: ${fontSize.sub};
	color: ${themed.invertedDark};

	${({theme}) => {
		if (theme.sectionActive === true)
			return 'color: white;'
	}}
`

export const SectionText = styled(SectionSubText)`
	flex: 1;
`


export const SectionButtonView = styled.View`
	margin-right: ${paddingHorizontal * -1}px;
`

export const SectionButtonText = styled(SectionText)`
	
`