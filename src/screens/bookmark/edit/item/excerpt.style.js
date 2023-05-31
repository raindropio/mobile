import styled from 'styled-components/native'
import { Input } from 'co/form'

export const ExcerptInput = styled(Input)`
    font-size: ${({theme})=>theme.fontSize.secondary}px;
    color: ${({theme})=>theme.text.secondary};
    margin: 0;
    padding: 0;
    text-align: left;
`