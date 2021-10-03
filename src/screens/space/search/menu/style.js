import styled from 'styled-components/native'

export const Wrap = styled.View`
    flex: 1;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: ${({theme})=>theme.background.regular};
`