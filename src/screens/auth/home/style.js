import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
	font-size: 22px;
	${({theme}) => theme.fontWeight.semibold}};
	text-align: center;
	color: ${({theme})=>theme.text.regular};
`

export const IntroSubtitle = styled.Text`
	margin-top: 14px;
	font-size: 17px;
	text-align: center;
	color: ${({theme})=>theme.text.secondary};
`