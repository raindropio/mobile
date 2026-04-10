import { useMemo } from 'react'
import { useTheme } from 'styled-components/native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

export default function StyledNavigationContainer(props) {
    const theme = useTheme()

    const navTheme = useMemo(()=>({
        dark: theme.dark,
        colors: {
            background: theme.background.regular,
            border: theme.color.border,
            card: theme.background.regular,
            notification: theme.color.danger,
            primary: theme.color.accent,
            text: theme.text.regular
        },
        fonts: DefaultTheme.fonts
    }), [theme])

    return <NavigationContainer {...props} theme={navTheme} />
}
