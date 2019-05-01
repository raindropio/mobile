import React from 'react'
import {
	ScrollView,
	Platform,
	StyleSheet,
	SafeAreaView
} from 'react-native'
import styled from 'styled-components/native'
import { fontSize, paddingHorizontal } from 'co/style/constants'
import { themed, themeIsDark } from 'co/style/colors'

const flexOne = {flex: 1}

export const formElementHeight = 44;
export const baseFormElementStyle = (theme)=>`
	height: ${formElementHeight}px;
	margin-left: ${paddingHorizontal}px;
	padding-left: 0;
	padding-right: ${paddingHorizontal}px;
	border-color: ${themed.invertedLight({theme})};
`

//ScrollView
export class ScrollForm extends React.Component {
	render() {
		return (//interactive
			<SafeAreaView style={flexOne}>
				<ScrollView style={flexOne} keyboardDismissMode='none' keyboardShouldPersistTaps='always' {...this.props}>
					{this.props.children}
				</ScrollView>
			</SafeAreaView>
		)
	}
}

export const BaseInput = styled.TextInput.attrs(props=>({
	enablesReturnKeyAutomatically: true,
	blurOnSubmit: true,
	underlineColorAndroid: 'transparent',
	disableFullscreenUI: true,
	placeholderTextColor: themed.invertedMedium(props),
	keyboardAppearance: themeIsDark(props)?'dark':'default',
	numberOfLines: 1
}))`
	font-size: ${fontSize.normal}px;
	color: ${themed.inverted};
	text-align-vertical: center;
`

export const Input = styled(BaseInput)`
	${({theme})=>baseFormElementStyle(theme)}
	font-size: ${({heading})=>heading ? fontSize.title : fontSize.normal}px;
	${({last})=>typeof last == 'undefined' ? `
		border-bottom-width: ${StyleSheet.hairlineWidth};
	`:''}
	${props=>typeof props.optional != 'undefined' ? `
		color: ${themed.invertedDark(props)};
	`:''}
	${({heading})=>typeof heading != 'undefined' ? `
		font-weight: 600;
	`:''}
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
	autoCapitalize: 'none'
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
	autoGrow: true,
	textContentType: 'URL',
})``

//Form
export const Form = styled.View`
	min-height: ${formElementHeight}px;
	height: auto;
	border-bottom-width: ${StyleSheet.hairlineWidth};
	background-color: ${themed.main};
	border-color: ${themed.invertedLight};
	${({first})=>!first && `
		border-top-width: ${StyleSheet.hairlineWidth};
		margin-top: 12px;
	`}

	${({last})=>typeof last == 'undefined' && `
		margin-bottom: 12px;
	`}

	${({hide})=>hide && `
		position: absolute;
		z-index:-1;
		opacity: 0;
		left:0;right:0;width:100%;
	`}
`

export const FormSection = styled.View`
	padding-left: ${paddingHorizontal}px;
	padding-top: ${paddingHorizontal/2}px;
	flex:1;
`


//Utils
export const SubInfoText = styled.Text.attrs({
	includeFontPadding: false,
	underlineColorAndroid: 'transparent'
})`
	font-size: ${fontSize.micro}px;
	color: ${themed.invertedMedium};
	text-align: center;
	padding-horizontal: ${paddingHorizontal}px;
	margin-top: ${paddingHorizontal}px;
	margin-left: ${paddingHorizontal}px;
`