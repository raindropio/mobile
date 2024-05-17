import styled from 'styled-components/native'
import CommonButton from 'co/button'

export const Wrap = styled.View`
    flex-direction: row;
    align-items: center;
    padding-horizontal: ${({theme})=>theme.padding.medium}px;
    padding-vertical: ${({theme})=>theme.padding.small}px;
`

export const Button = styled(CommonButton)`
    flex: 1;
`