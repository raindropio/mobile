import styled from 'styled-components/native'

export const Bg = styled.View`
    background: ${({ theme, selected })=> selected ? theme.color.accent+'15' : 'transparent' };
`