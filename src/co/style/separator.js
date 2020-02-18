import React from 'react'
import { StyleSheet, View } from 'react-native'
import { themed } from 'co/style/colors'
import { paddingHorizontal } from 'co/style/constants'

const styles = StyleSheet.create({
	line: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: themed.invertedLight({}),
		marginLeft: paddingHorizontal
	}
})

export default function({style, ...props}) {
	return <View style={[styles.line, style]} {...props} />
}