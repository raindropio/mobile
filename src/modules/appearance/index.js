import React from 'react'
import { connect } from 'react-redux'
import { setAppearance } from 'local/actions'
import { useColorScheme } from 'react-native'
import { ThemeProvider } from 'styled-components'

import Themes from './themes'
import Size from './size'

function Appearance({ children, override }) {
    const colorScheme = useColorScheme()
    
    const theme = {
        ...Themes[override||colorScheme],
        ...Size
    }
        
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default connect(
	state => ({
        override: state.local.appearance
    }),
	{ setAppearance }
)(Appearance)