import styled from 'styled-components/native'
import { ActivityIndicator } from 'co/native'

export const Loading = styled(ActivityIndicator)`
    margin-right: ${({theme})=>theme.padding.medium}px;
`