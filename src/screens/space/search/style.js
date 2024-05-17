import styled from 'styled-components/native'

export const Wrap = styled.View`
    flex: 1;
    flex-direction: column;
    background: ${({theme})=>theme.background.regular};
`

export const Content = styled.View`
    flex: 1;
    flex-direction: column;
`