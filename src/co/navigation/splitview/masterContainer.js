import React from 'react'
import styled from 'styled-components/native'
import { ThemeProvider, useTheme } from 'styled-components'
import NavigationContainer from 'co/navigation/container'
import Animated from 'react-native-reanimated'

export default function MasterContainer({ children }) {
    const { dark, background } = useTheme()

    if (dark)
        return children

    return (
        <ThemeProvider theme={{background: {...background, regular: background.sidebar} }}>
            <NavigationContainer independent>
                {children}
            </NavigationContainer>
        </ThemeProvider>
    )
}

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