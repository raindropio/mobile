import styled from 'styled-components/native'

export const Buttons = styled.View`
    flex-direction: ${({vertical})=>vertical ? 'column' : 'row'};
    margin: 0 ${({theme})=>theme.padding.medium}px;
`