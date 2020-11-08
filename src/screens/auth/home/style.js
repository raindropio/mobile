import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import SafeAreaView from 'react-native-safe-area-view'

export const WelcomeView = styled(SafeAreaView)`
	flex: 1;
`

export const IntroView = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: 30px;
`

export const IntroTitle = styled.Text`
	margin-top: 30px;
	font-size: 20px;
	${({theme}) => theme.fontWeight.semibold}};
	text-align: center;
	color: ${({theme})=>theme.text.regular};
`

export const IntroSubtitle = styled.Text`
	margin-top: 12px;
	font-size: 17px;
	text-align: center;
	color: ${({theme})=>theme.text.regular};
`

export const ErrorText = styled.Text`
	margin: 18px;
	font-size: 11px;
	${({theme}) => theme.fontWeight.semibold}};
	letter-spacing: 1px;
	text-align: center;
	color: ${({theme})=>theme.color.danger};
`

//
export const BlocksView = styled.View`
	padding: 8px;
	flex-wrap: wrap;
	flex-direction: row;
`

export const BlockTap = styled(RectButton)`
	flex: 1;
	min-width: 250px;
	padding: 8px 24px;
	margin: 8px;
	border-width: ${StyleSheet.hairlineWidth}px;
	border-color: ${({theme})=>theme.color.border};
	border-radius: 4px;
	background: ${({variant, theme})=>{
		switch(variant){
			case 'black': return 'black'
			case 'gray': return theme.color.border
			default: return 'transparent'
		}
	}}
`

export const Block = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

export const BlockText = styled.Text`
	font-size: 16px;
	margin-left: 6px;
	color: ${({color, white, theme})=> white ? 'white' : ((color && !theme.dark) ? color : theme.text.regular)};
`

export const BlockImage = styled.Image`
	tint-color: ${({theme})=>theme.text.regular};
`

export const PreloaderView = styled.View`
	position: absolute;
	top:1px;right:0;left:0;bottom:0;
	background: ${({theme})=>theme.background.regular};
	justify-content: center;
	align-items: center;
	z-index: 999;
`

export const Preloader = styled.ActivityIndicator``