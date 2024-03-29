import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

export const Wrap = styled.View`
    flex: 1;
    background: ${({theme})=>theme.background.regular};
`

export const Toolbar = styled.View`
	flex-direction: row;
    justify-content: space-evenly;
    padding: ${({theme})=>theme.padding.small}px 0;
    shadow-radius: 3px;
    shadow-opacity: 0.1;
    shadow-offset: 0 -1px;
    border-top-width: ${StyleSheet.hairlineWidth}px;
    border-color: ${({theme})=>theme.color.border};
`

export const HorizontalPreloader = styled(Animated.View)`
    background: ${({theme})=>theme.color.accent};
    height: 2px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
`