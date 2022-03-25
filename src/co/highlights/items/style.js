import styled from 'styled-components/native'
import FlatList from 'co/list/flat/basic'

export const List = styled(FlatList)`
    flex: 1;
    padding-vertical: ${({theme})=>theme.padding.medium}px;
`