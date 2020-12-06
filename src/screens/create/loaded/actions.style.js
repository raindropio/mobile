import styled from 'styled-components/native'
import Button from 'co/button'

export const Actions = styled.View`
    flex-direction: row;
    padding: 0 ${({theme}) => theme.padding.small}px;
`

export const Action = styled(Button)`
    flex: 1;
    margin-horizontal: ${({theme}) => theme.padding.small}px;
`