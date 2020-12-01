import styled from 'styled-components/native'
import { Input } from 'co/form'

export const Wrap = styled.View`
    flex: 1
`

export const DescriptionInput = styled(Input)`
    font-size: ${({theme})=>theme.fontSize.secondary}px;
`