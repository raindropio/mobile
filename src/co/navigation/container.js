import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'

export default styled(NavigationContainer)
    .attrs(({ theme })=>({
        theme: {
            dark: theme.dark,
            colors: {
                background: theme.background.regular,
                border: theme.color.border,
                card: theme.background.regular,
                notification: theme.color.danger,
                primary: theme.color.accent,
                text: theme.text.regular
            }
        }
    }))``