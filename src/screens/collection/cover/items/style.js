import styled from 'styled-components/native'
import FlatList from 'co/list/flat/basic'

export const Wrap = styled.View`
    flex: 1;
`

const ListFooterComponent = styled.View`
    height: 50px;
`

export const Grid = styled(FlatList).attrs({
    ListFooterComponent
})`
    flex: 1;
    padding-top: ${({theme})=>theme.padding.small}px;
    padding-horizontal: ${({theme})=>theme.padding.small}px;
`