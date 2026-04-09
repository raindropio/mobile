import styled from 'styled-components/native'

export const Switch = styled.Switch.attrs(({ theme, value })=>({
    trackColor: {
        false: theme.background.disabled,
        true: theme.color.accent+'50'
    },
    thumbColor: value ? theme.color.accent : theme.text.tertiary,
}))``