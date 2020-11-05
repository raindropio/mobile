import styled from 'styled-components/native'
import { Animated, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	wrap: {
		flex: 1
	}
})

export const Line = Animated.createAnimatedComponent(styled.View`
	position: absolute;
	left:0;top:0;
	z-index:99;
	width: 100%;
	height: 3px;
	background-color: ${({theme})=>theme.color.accent};
`)

export const Bar = Animated.createAnimatedComponent(styled.View`
	position: absolute;
	left:0;top:0;
	z-index:99;
	width: 100%;
	height: 3px;
	background-color: ${({theme})=>theme.text.disabled};
`)