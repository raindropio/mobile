import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'
import Animated from 'react-native-reanimated'

export default styled(NavigationContainer)
    .attrs(({ theme })=>({
        theme: {
            ...theme,
            colors: {
                ...theme.color,
                background: theme.background.alternative,
                card: theme.background.alternative,
            }
        },
        independent: true
    }))``

export const MasterWrap = styled(Animated.View)`
    flex: 1
`

export const MasterBackdrop = styled(Animated.View).attrs({
    pointerEvents: 'none'
})`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #00000030;
    z-index: 9999999;
`