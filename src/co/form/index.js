import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

const flexOne = {flex: 1}

export const formElementHeight = 44;
export const baseFormElementStyle = (theme)=>`
	height: ${formElementHeight}px;
	margin-left: ${theme.padding.medium}px;
	padding-left: 0;
	padding-right: ${theme.padding.medium}px;
	border-color: ${theme.color.border};
`

//ScrollView
const ScrollFormView = styled(Animated.ScrollView).attrs(({ theme, contentContainerStyle={} })=>({
	contentContainerStyle: {
		paddingTop: theme.padding.medium,
		paddingBottom: theme.padding.large,
		...contentContainerStyle,
	},
	keyboardDismissMode: 'none',
	keyboardShouldPersistTaps: 'always',
	automaticallyAdjustContentInsets: false,
	scrollEventThrottle: 100
}))`
	flex: 1
`

export class ScrollForm extends React.Component {
	edges = ['left', 'right']
	
	render() {
		return (
			<SafeAreaView style={flexOne} edges={this.edges}>
				<ScrollFormView {...this.props} />
			</SafeAreaView>
		)
	}
}

export const BaseInput = styled.TextInput.attrs(({ theme, blurOnSubmit=true, enablesReturnKeyAutomatically=true })=>({
	enablesReturnKeyAutomatically,
	blurOnSubmit,
	underlineColorAndroid: 'transparent',
	disableFullscreenUI: true,
	placeholderTextColor: theme.text.secondary,
	keyboardAppearance: theme.dark?'dark':'default',
	numberOfLines: 1
}))`
	font-size: ${({theme})=>theme.fontSize.primary}px;
	color: ${({theme})=>theme.text.regular};
	text-align-vertical: center;
`

export const Input = styled(BaseInput)`
	${({theme})=>baseFormElementStyle(theme)}
	font-size: ${({theme})=>theme.fontSize.primary}px;
	${({last})=>typeof last == 'undefined' ? `
		border-bottom-width: ${StyleSheet.hairlineWidth}px;
	`:''}
	${({optional, theme})=>typeof optional != 'undefined' ? `
		color: ${theme.text.regular};
	`:''}
	${({heading, theme})=>typeof heading != 'undefined' ? theme.fontWeight.semibold+';' :''}
	${({multiline})=>typeof multiline != 'undefined'  ? `
		margin-top: 6px;
		height: auto;
		padding-bottom: 11px;
		text-align-vertical: top;
	`:''}
`

export const InputEmail = styled(Input).attrs({
	keyboardType: 'email-address',
	autoCorrect: false,
	autoCapitalize: 'none',
	placeholder: 'Email'
})``

export const InputPassword = styled(Input).attrs({
	secureTextEntry: true,
	autoCorrect: false,
	autoCapitalize: 'none'
})``

export const InputURL = styled(Input).attrs({
	keyboardType: Platform.OS == 'ios' ? 'url' : 'email-address',
	autoCorrect: false,
	autoCapitalize: 'none',
	multiline: true,
	textContentType: 'URL',
})``

//Form
export const Form = styled.View`
	margin: ${({theme})=>theme.padding.medium}px;
	margin-top: 0;
	min-height: ${formElementHeight}px;
	height: auto;
	border-radius: ${({theme})=>theme.padding.small}px;
	background-color: ${({theme})=>theme.background.regular};
	overflow: hidden;

	${({hide})=>hide && `
		position: absolute;
		z-index:-1;
		opacity: 0;
		left:0;right:0;width:100%;
	`}

	flex-direction: ${({horizontal})=>horizontal ? 'row' : 'column'};
`

export const FormSection = styled.View`
	padding: ${({theme})=>theme.padding.medium}px;
	padding-top: ${({theme})=>theme.padding.small}px;
`


//Utils
export const SubInfoText = styled.Text.attrs({
	includeFontPadding: false,
	underlineColorAndroid: 'transparent'
})`
	font-size: ${({theme})=>theme.fontSize.tertiary}px;
	color: ${({theme})=>theme.text.secondary};
	text-align: center;
	padding-horizontal: ${({theme})=>theme.padding.medium}px;
	margin-top: ${({theme})=>theme.padding.medium}px;
	margin-left: ${({theme})=>theme.padding.medium}px;
`