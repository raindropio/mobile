import styled from 'styled-components/native'

export const Wrap = styled.View`
    background: ${({theme})=>theme.background.alternative};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 999;
    flex: 1;
    align-items: center;
    justify-content: center;
`