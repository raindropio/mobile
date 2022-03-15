import React, { useMemo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setAppearance } from 'local/actions'
import { useColorScheme, AppState } from 'react-native'
import { ThemeProvider } from 'styled-components'

import Themes from './themes'
import Size from './size'

function useFixedColorScheme() {
    const current = useColorScheme()
    const [val, setVal] = useState(()=>current)
    const [as, setAs] = useState(()=>AppState.currentState)
    useEffect(() => (AppState.addEventListener('change', setAs)).remove, [])
    useEffect(() => { if (as == 'active') {setVal(current)} }, [current, as])
    return val
}

function Appearance({ children, override }) {
    const colorScheme = useFixedColorScheme()
    
    const theme = useMemo(
        ()=>({
            ...(Themes[override||colorScheme] || Themes.light),
            ...Size
        }),
        [override, colorScheme]
    )
        
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