import styled from 'styled-components/native'

export const Backdrop = styled.View`
    flex: 1;
    background-color: ${({transparent})=>transparent ? 'transparent' : 'rgba(0,0,0,.25)'}
`