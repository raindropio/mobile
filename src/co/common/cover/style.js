import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { StyleSheet } from 'react-native'
import { themed } from 'co/style/colors'

export const CoverImage = styled(FastImage)`
	width: ${({width})=>width ? width+'px' : 'auto'};
	height: ${({height})=>height ? height+'px' : 'auto'};
	background-color: ${({fallbackColor, theme})=>fallbackColor||themed.mainAlt({theme})};
	
`/*border-width: ${StyleSheet.hairlineWidth}px;
	border-color: #00000025; */

export const LoadingWrap = styled.ActivityIndicator.attrs(props=>({
	color: themed.invertedMedium(props)
}))`
	position: absolute;
	z-index: 1;
	left:0;right:0;bottom:0;top:0;
`