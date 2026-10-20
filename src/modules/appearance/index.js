import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useColorScheme, AppState } from 'react-native'
import { ThemeProvider } from 'styled-components/native'

import Themes from './themes'
import Size from './size'

function useFixedColorScheme() {
    const current = useColorScheme()
    const [val, setVal] = useState(()=>current)
    const [as, setAs] = useState(()=>AppState.currentState)
    useEffect(()=>(AppState.addEventListener('change', setAs)).remove, [])
    if (as == 'active' && val != current)
        setVal(current)
    return val
}

export default function Appearance({ children }) {
    const override = useSelector(state=>state.local.appearance)
    const colorScheme = useFixedColorScheme()

    const theme = {
        ...(Themes[override||colorScheme] || Themes.light),
        ...Size
    }

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}