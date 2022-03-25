import styled from 'styled-components/native'

export const Wrap = styled.View`
    flex-direction: row;
    margin: 5px 0;
`

export const Tick = styled.View`
    background: ${({ theme, color })=>theme.color[color||'yellow'] || color};
    width: 3px;
    border-radius: 3px;
    margin-right: 7px;
`