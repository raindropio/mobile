import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { ThemeProvider, useTheme } from 'styled-components'
import NavigationContainer from 'co/navigation/container'

export default function MasterContainer({ children }) {
    const { background } = useTheme()

    const theme = useMemo(
        ()=>({background: {...background, regular: background.sidebar} }),
        [background.sidebar]
    )

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer independent>
                {children}
            </NavigationContainer>
        </ThemeProvider>
    )
}

export const MasterWrap = styled.View`
    flex: 1
`