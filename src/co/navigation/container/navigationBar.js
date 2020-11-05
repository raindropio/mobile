import React, { useContext, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

export default function NavigationBar() {
    const themeContext = useContext(ThemeContext)
    
    useEffect(() => {
        changeNavigationBarColor(themeContext.background.regular, !themeContext.dark, false)
    }, [themeContext])
    
    return null
}