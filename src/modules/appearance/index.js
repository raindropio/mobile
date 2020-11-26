import React from 'react'
import { useColorScheme, Platform } from 'react-native'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components/native'

import Themes from './themes'
import Size from './size'

export default function Appearance({ children }) {
    const colorScheme = useColorScheme()
    const theme = {
        ...Themes[colorScheme],
        ...Size
    }
        
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export const AppWrap = styled.View`
    flex: 1;
    ${({theme})=>Platform.OS === 'android' ? `background: ${theme.background.regular};` : ''}
`