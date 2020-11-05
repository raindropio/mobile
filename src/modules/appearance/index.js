import React from 'react'
import { useColorScheme } from 'react-native'
import { ThemeProvider } from 'styled-components'

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