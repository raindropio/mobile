import styled from 'styled-components/native'
import {Animated} from 'react-native'
import {themed} from 'co/style/colors'

export const Wrap = styled.View.attrs({
	pointerEvents: 'box-none'
})`
	flex:1;
`

export const Line = Animated.createAnimatedComponent(styled.View`
	position: absolute;
	left:0;top:0;
	z-index:99;
	width: 100%;
	height: 3px;
	background-color: ${themed.tintColor};
`)

export const Bar = Animated.createAnimatedComponent(styled.View`
	position: absolute;
	left:0;top:0;
	z-index:99;
	width: 100%;
	height: 3px;
	background-color: ${themed.invertedLight};
`)