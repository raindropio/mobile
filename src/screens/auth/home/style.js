import styled from 'styled-components/native'
import { fontWeightMedium } from 'co/style/font'
import { StyleSheet } from 'react-native'
import colors, { themed, themeIsDark } from 'co/style/colors'

export const WelcomeView = styled.SafeAreaView`
	flex: 1;
	background-color: ${themed.mainAlt};
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
	${fontWeightMedium()}
	text-align: center;
	color: ${themed.inverted};
`

export const IntroSubtitle = styled.Text`
	margin-top: 12px;
	font-size: 17px;
	text-align: center;
	color: ${themed.inverted};
`

export const ContinueText = styled.Text`
	margin: 18px;
	font-size: 11px;
	${fontWeightMedium()}
	letter-spacing: 1px;
	text-align: center;
	color: ${themed.invertedMedium};
`

export const ErrorText = styled(ContinueText)`
	color: ${colors.red};
`

//
export const BlocksView = styled.View`
	background-color: ${themed.main};
	flex-direction: row;
	flex-wrap: wrap;
	margin-horizontal: -1px;
`

export const BlockTap = styled.TouchableHighlight.attrs({
	underlayColor: colors.touchFeedback,
	activeOpacity: 0.9
})`
	padding: 24px;
	width: 50%;
	border-width: ${StyleSheet.hairlineWidth}px;
	border-color: ${themed.invertedLight};
	border-left-width: 0;
	border-bottom-width: 0;
`

export const Block = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

export const BlockText = styled.Text`
	font-size: 16px;
	margin-left: 6px;
	color: ${({color})=> (color && !themeIsDark()) ? color : themed.inverted()};
`

export const PreloaderView = styled.View`
	position: absolute;
	top:1;right:0;left:0;bottom:0;
	background: ${themed.main};
	justify-content: center;
	align-items: center;
	z-index: 999;
`

export const Preloader = styled.ActivityIndicator``