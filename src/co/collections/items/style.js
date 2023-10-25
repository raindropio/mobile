import styled from 'styled-components/native'

export const Wrap = styled.View`
    background: ${({theme})=>theme.background.regular};
    ${({disableVirtualization})=>!disableVirtualization?'flex: 1;':''}
`

export const Footer = styled.View`
    height: 32px;
`