import styled from 'styled-components/native'
import { Animated } from 'react-native'

export const View = styled(Animated.View)`
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({theme})=>theme.background.alternative};
`