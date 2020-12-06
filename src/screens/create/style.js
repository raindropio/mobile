import styled from 'styled-components/native'

export const Wrap = styled.View`
    flex: 1
`

export const Backdrop = styled.Pressable`
    flex: 1;
    height: 100%;
    background: #00000001;
`

export const Body = styled.View`
    height: 280px;
    background: ${({theme})=>theme.background.alternative};
`