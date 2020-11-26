import React, { useContext, useEffect } from 'react'
import { Platform } from 'react-native'
import { ThemeContext } from 'styled-components'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

export default function NavigationBar() {
    if (Platform.Version < 27)
        return null

    const { dark, background } = useContext(ThemeContext)
    
    useEffect(() => {
        changeNavigationBarColor(
            background.regular, 
            !dark, 
            false
        )
    }, [dark, background])
    
    return null
}