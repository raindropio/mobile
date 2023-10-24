import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native'

const StyledNavigationContainer = styled(NavigationContainer)
    .attrs(({ theme })=>({
        theme: {
            dark: theme.dark,
            colors: {
                background: theme.background.alternative,
                border: theme.color.border,
                card: theme.background.regular,
                notification: theme.color.danger,
                primary: theme.color.accent,
                text: theme.text.regular
            }
        }
    }))``

export default function(props) {
    return (
        <StyledNavigationContainer {...props} />
    )
}