import React from 'react'
import { ScrollView, Platform, StyleSheet, SafeAreaView } from 'react-native'

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
export class ScrollForm extends React.Component {
	edges = ['left', 'right', 'bottom']
	
	render() {
		return (//interactive
			<SafeAreaView style={flexOne} edges={this.edges}>
				<ScrollView style={flexOne} keyboardDismissMode='none' keyboardShouldPersistTaps='always' {...this.props}>
					{this.props.children}
				</ScrollView>
			</SafeAreaView>
		)
	}
}

export const BaseInput = styled.TextInput.attrs(({theme})=>({
	enablesReturnKeyAutomatically: true,
	blurOnSubmit: true,
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
	font-size: ${({heading, theme})=>heading ? theme.fontSize.head : theme.fontSize.primary}px;
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
	border-bottom-width: ${StyleSheet.hairlineWidth}px;
	background-color: ${({theme})=>theme.background.regular};
	border-color: ${({theme})=>theme.color.border};
	${({first})=>!first && `
		border-top-width: ${StyleSheet.hairlineWidth}px;
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
	padding-left: ${({theme})=>theme.padding.medium}px;
	padding-top: ${({theme})=>theme.padding.small}px;
	flex:1;
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