import styled from 'styled-components/native'

export const Wrap = styled.View`
    background: ${({ theme })=>theme.background.alternative};
    flex-direction: row;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`