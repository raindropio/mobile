import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const Switch = styled.Switch.attrs(({ theme, value })=>({
    ...Platform.select({
        android: {
            trackColor: {
                false: theme.background.disabled,
                true: theme.color.accent+'50'
            },
            thumbColor: value ? theme.color.accent : theme.text.tertiary
        },
        ios: {
            ios_backgroundColor: theme.text.disabled,
            trackColor: {
                false: 'transparent',
                true: theme.color.accent
            },
            thumbColor: theme.background.regular,
        }
    }),
}))``